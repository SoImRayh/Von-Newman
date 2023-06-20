import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import { add } from "husky";
import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";
import { Mascaras } from "@/app/domain/utils/Mascaras";

export enum OverwritePolice {
    FIFO = 0,
    LFU,
    LRU,
}

export class CacheMapeamentoAssociativo implements MemoriaCache {
    ram: MemRAM;
    linhas: Linha[] = [];
    _tam_campo_word: number;
    _tam_campo_bloco: number;
    _qtd_linhas: number;
    _tam_bloco: number;
    _overwrite_police: OverwritePolice;
    _total_de_hits: number;
    _total_de_misses: number;
    _total_de_buscas: number;

    constructor(qtd_linhas: number, tam_bloco: number, overidePolice: OverwritePolice) {
        this._total_de_buscas = 0
        this._total_de_misses = 0
        this._total_de_hits = 0
        this._qtd_linhas = qtd_linhas
        this._tam_bloco = tam_bloco;
        this._tam_campo_word = Math.log2(tam_bloco);
        this._overwrite_police = overidePolice;
        this.ram = new MemRAM(512, tam_bloco)

        for (let i = 0; i < qtd_linhas; i++) {
            this.linhas.push(new Linha(tam_bloco));
        }
    }
    private async latencia(time :number){
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve()
            }, time)
        })
    }
    buscar(address: number): Promise<number> {
        this._total_de_buscas++

        return new Promise(async (resolve) => {
            const campo_tag = this.calcular_tag( address );
            const campo_word: number = this.calcular_word( address );
            let bit_word: number;

            const linha: Linha | undefined = this.linhas.find(
                (linha) => linha.tag == campo_tag
            );

            if (linha && linha.bloco[0x0] != 0x0) {
                this._total_de_hits++
                linha.count++;
                bit_word = linha.bloco[campo_word]
                for (let i = 1; i < 4; i++) {
                    bit_word = (bit_word << 8) | linha.bloco[campo_word + i]
                }
                await this.latencia(500)
                resolve(bit_word)
            } else {
                this._total_de_misses++
                await this.buscar_na_ram(address)
                const nova_linha = this.linhas.find(
                    linha => linha.tag == campo_tag
                )
                if (nova_linha){
                    bit_word = nova_linha.bloco[campo_word]
                    for (let i = 1; i < 4; i++) {
                        bit_word = (bit_word << 8) | nova_linha.bloco[campo_word + i]
                    }
                    await this.latencia(2000)
                    resolve(bit_word)
                }
            }
        });
    }

    getHitRatio(): number {
        return this._total_de_hits/this._total_de_buscas;
    }

    getMissRatio(): number {
        return this._total_de_misses/this._total_de_buscas;
    }

    salvar(address: number, value: number): Promise<void> {
        return new Promise<void>( (resolve) => {
            const word: number = this.calcular_word(address);
            const tag: number = this.calcular_tag(address);

            const linha = this.linhas.find(
                (linha) => linha.tag == tag
            );

            if (linha) {
                linha.bloco[word] = value & Mascaras.BYTE_0;
                linha.bloco[word+1] = value & Mascaras.BYTE_1
                linha.bloco[word+2] = value & Mascaras.BYTE_2
                linha.bloco[word+3] = value & Mascaras.BYTE_3
                linha.is_Altered = true
            } else {
                switch (this._overwrite_police) {
                    case OverwritePolice.FIFO: {
                        if (this.linhas[this._qtd_linhas - 1].isAltered()) {
                            this.ram.persistirBloco( address, this.linhas[this._qtd_linhas - 1].bloco);
                        }
                        this.linhas.pop()
                        this.ram.buscarBloco(address).then((bloco) => {
                            this.linhas.unshift(new Linha(this._tam_bloco, tag, bloco));
                            this.linhas[0].bloco[word] = value
                            this.linhas[0].is_Altered =true
                        });

                        break;
                    }

                    case OverwritePolice.LFU: {
                        // Last frequent used
                        this.linhas.sort((a, b) =>
                            a.count < b.count ? 1 : -1
                        );
                        this.ram.buscarBloco(address).then((bloco) => {
                            this.linhas.push(new Linha(this._tam_bloco, tag, bloco));
                        });
                        break;
                    }

                    case OverwritePolice.LRU: {
                        this.linhas.sort((a, b) =>
                            a.count < b.count ? 1 : -1
                        );
                        this.linhas.pop();
                        this.ram.buscarBloco(address).then((val) => {
                            this.linhas.push(new Linha(this._tam_bloco, tag, val));
                        });
                        break;
                    }

                }
            }
            resolve()
        })
    }

    private calcular_tag(address: number): number {
        return (address >> this._tam_campo_word);
    }

    private calcular_word(address: number): number {
        const mascara: number = this.calcular_mascara_campo_word();
        return address & mascara;
    }

    private calcular_mascara_campo_word(): number {
        let mascara: number = 1;
        for (let i = 0; i < this._tam_campo_word - 1; i++) {
            mascara = (mascara << 1) | 1;
        }
        return mascara;
    }


    private buscar_na_ram(address: number): Promise<void> {
        return new Promise<void>((resolve)=> {
            const campo_tag = this.calcular_tag( address )

            switch (this._overwrite_police) {
                case OverwritePolice.FIFO: {
                    const linha = this.linhas[this._qtd_linhas -1]
                    if (linha.isAltered()) {
                        this.ram.persistirBloco((linha.tag<<2), this.linhas[this._qtd_linhas - 1].bloco);
                    }
                    this.linhas.pop()
                    this.ram.buscarBloco(address).then((bloco) => {
                        this.linhas.unshift(new Linha(this._tam_bloco, campo_tag, bloco));
                    });
                    break;
                }
                //todo demais overite ainda nao verificados

                case OverwritePolice.LFU: {
                    // Last frequent used
                    this.linhas.sort((a, b) =>
                        a.count < b.count ? 1 : -1
                    );
                    this.ram.buscarBloco(address).then((bloco) => {
                        this.linhas.push(new Linha(this._tam_bloco, campo_tag, bloco));
                    });
                    break;
                }

                case OverwritePolice.LRU: {
                    this.linhas.sort((a, b) =>
                        a.count < b.count ? 1 : -1
                    );
                    this.linhas.pop();
                    this.ram.buscarBloco(address).then((val) => {
                        this.linhas.push(new Linha(this._tam_bloco, campo_tag, val));
                    });
                    break;
                }

            }
            resolve()
        })
    }
}
