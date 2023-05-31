import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import { add } from "husky";
import { Linha } from "../imp/types/Linha";




export enum OverwritePolicy {
  FIFO = 0,
  LFU,
  LRU,

}

export class CacheMapeamentoAssociativo implements MemoriaCache{

  ram: MemRAM
  linhas: Linha[] = []
  _tam_campo_word: number
  _tam_campo_bloco: number
  _tam_campo_tag: number
  _qtd_linhas: number
  _tam_bloco: number
  _overwrite_police: OverwritePolicy
  _miss: number
  _hit: number
  _buscas: number


  constructor(qtd_linhas: number, tam_bloco: number, overidePolice: OverwritePolicy) {

    this._tam_bloco = Math.log2(qtd_linhas)
    this._tam_campo_word = Math.log2(tam_bloco)
    this._overwrite_police = overidePolice

    //inicializando as linhas com novos arrays vazios
    for (let i = 0; i < qtd_linhas; i++) {
      this.linhas.push(new Linha(0x0, tam_bloco, new Uint8Array(tam_bloco)))
    }
  }
  buscar(address: number): Promise<number> {
    this._buscas++


    return new Promise( resolve => {
      const tag = this.calcular_tag( address )
      const linha : Linha | undefined = this.linhas.find(linha => linha.tag == tag )


      if ( linha ){
        this._hit++
        return linha.bloco[this.calcularPos( address )]
        //TODO como incrementar cada um se acerto de cache
        //lfu se acessar a linha incrementa apenas o contador da linha
        //
      }else {
        this._miss++
        switch (this._overwrite_police) {
          case OverwritePolicy.FIFO: {
            if (this.linhas[this._qtd_linhas-1].is_Altered){
              const endereco_inicial : number = tag * this._tam_bloco;
              this.ram.persistirBloco(endereco_inicial, this.linhas[this._qtd_linhas-1].bloco)
            }
            this.linhas.pop()
            this.ram.buscar(address, this._tam_bloco).then( bloco => {
              this.linhas.unshift(new Linha(tag, this._tam_bloco, bloco))
            })
            break;
          }

          case OverwritePolicy.LFU: {
            // Last frequent used
            const indexOf = this.linhas.indexOf(this.linhas.reduce((prev, curr) =>
              prev._contador_LFU < curr._contador_LFU ? prev: curr)
            )
            this.ram.buscar(address, this._tam_bloco).then( bloco => {
              this.linhas[indexOf] = new Linha(tag ,this._tam_bloco, bloco)
            })
            break
          }

          case OverwritePolicy.LRU: {
            const indexOf : number = this.linhas.indexOf(this.linhas.reduce((prev, curr) =>
              prev._contador_LRU < prev._contador_LRU ? prev : curr
            ))
            this.ram.buscar(address, this._tam_bloco).then( bloco => {
              this.linhas[indexOf] = new Linha(tag, this._tam_bloco, bloco)
            })
            break;
          }
        }
      }
    });
  }

  salvar(address: number, value: number): void {
    const bloco: number = this.calcular_bloco( address )
    const word: number = this.calcular_word( address )
    const tag: number = this.calcular_tag( address )

    const linha  : Linha | undefined = this.linhas.find(linha =>
      linha.tag == this.calcular_tag( address )
    )

    //A linha a ser modificada está na cache, logo não é necessário buscar o bloco para alterar.
    if ( linha ){
      linha.bloco[this.calcular_word( address )] = value
    }else{
      let bloco: Uint8Array;
      this.ram.buscar(address, this._tam_bloco).then( (bloco: Uint8Array) => {
        bloco = bloco
      })
    }

  }

  getHitRatio(): number {
    return 0;
  }

  getMissRatio(): number {
    return 0;
  }

  private calcular_tag( address: number ): number {
    return (address >> this._tam_campo_word) >> this._tam_campo_bloco
  }


  private calcular_word( address: number): number{
    const mascara: number = this.calcular_mascara_campo_word()
    return ( address | mascara )
  }


  private calcular_mascara_campo_word(): number {
    let mascara : number = 1
    for (let i = 0; i < ( this._tam_campo_word - 1 ); i++) {
      mascara = ( mascara << 1) | 1
    }
    return mascara
  }


  private calcular_bloco(address: number) {
    const mascara: number = this.calcular_mascara_campo_bloco()
    return (address | mascara) >> this._tam_campo_word;
  }


  private calcular_mascara_campo_bloco(): number {
    let mascara : number = 1
    for (let i = 0; i < (this._tam_campo_bloco - 1 ); i++) {
      mascara = (mascara << 1) | 1
    }
    mascara = mascara << this._tam_campo_word
    return mascara
  }

  private calcularPos(address: number): number{
    const pos: number = (address & this.calcular_mascara_campo_word())
    return pos
  }


}
