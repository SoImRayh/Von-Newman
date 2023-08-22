import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM }from "../../memoria_ram/MemRAM";
import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";

type Props = {
  size: number;
  ram?: MemRAM;
}


export class CacheMapeamentoDireto implements MemoriaCache {

   ram: MemRAM;
   linhas: Linha[]
   _tam_bloco: number;
   _qtd_linhas: number;
   _total_de_hits: number = 0;
   _total_de_misses: number;
   _total_de_buscas: number;
   latencias: { self: number; ram: number; };

  constructor(qtd_linhas: number, tam_bloco: number, ram?: MemRAM) {

    if(ram){

      this.ram = ram;
      this._tam_bloco = tam_bloco
      this._qtd_linhas = qtd_linhas
      this.linhas = new Array<Linha>(qtd_linhas).fill(new Linha(this._tam_bloco))

    }else {

      this.ram = new MemRAM(64,4)
      this._tam_bloco = tam_bloco
      this._qtd_linhas = qtd_linhas
      this.linhas = new Array<Linha>(qtd_linhas).fill(new Linha(this._tam_bloco))

    }

  }

  restart: () => void;
  buscar(address: number): Promise<number> {
    this._total_de_buscas++
    return new Promise( (resolve) => {

      const pos_palavra_no_bloco: number =
        this.calcularPosicaoDaPalavraNoBloco( address )
      const linha = this.calcularLinha( address )

      //Se as tag's forem identicas é hit de cache
      if(this.calcular_tag_do_endereco(address) == this.linhas[linha].tag){
        this._total_de_hits++
        resolve(this.linhas[linha].bloco[pos_palavra_no_bloco])
      }else {
        this._total_de_misses++

        ///Verificando se a linha foi alterada, se sim, deve ser persistido o bloco;
        if (this.linhas[linha].is_Altered)
          this.ram.persistirBloco(
            this.linhas[linha].bloco[0],
            this.linhas[linha].bloco
          )

        //Buscando um novo bloco da memória ram, e salvando-o na devida linha
        this.ram.buscarBloco(address).then( bloco => {
          this.linhas[linha] = new Linha(
            this._tam_bloco,
            this.calcular_tag_do_endereco(address),
            bloco
          )
        })

        resolve(this.linhas[linha].bloco[pos_palavra_no_bloco])
      }
    });
  }

  private calcular_tag_do_endereco(address: number): number {

    const tam_word: number = Math.log2(this._tam_bloco)
    const tam_r: number = Math.log2(this._qtd_linhas)


    return ((address >> tam_word) >> tam_r)
  }

    /*
    * descobrir o bloco em que se encontra a palavra é cociente do endereço
    * pelo tamanho dos blocos arredodado para baixo
    * */
  private calcularBloco(address: number):number {
    return Math.floor(address/this._tam_bloco)
  }


      /*
      * A posição da palavra no bloco é calculada a partir do resto da divisao
      * do endereço pelo tamanho do bloco
      * */
  private calcularPosicaoDaPalavraNoBloco(address: number){
    return address % this._tam_bloco
  }


    /*
    * A linha é calculada tomando o resto da divisao do bloco pela quantidade de linhas
    * */
  private calcularLinha(address: number): number {
    return this.calcularBloco( address ) % this._qtd_linhas
  }

  getHitRatio(): number {
    return this._total_de_hits / this._total_de_buscas;
  }

  getMissRatio(): number {
    return this._total_de_misses / this._total_de_buscas;
  }

  getTotalSize(): number {
    return this._qtd_linhas * this._tam_bloco ;
  }

  getLinhas():  Linha[] {
    return this.linhas
  }

  /*
  * A implementação de salvar um novo valor é:
  * -> Definir a tag
  * -> verificar se a linha com a tag está na cache
  *   -> se sim, apenas alterar o bloco
  *   -> se não, salvar a linha existente ( se alterada ), e substituir por uma nova
  * */
  salvar(address: number, value: number): Promise<void> {
      return new Promise<void>((resolve) => {
        const linha : number = this.calcularLinha( address )
        const tag : number = this.calcular_tag_do_endereco( address )

        if (this.linhas[linha].tag == tag){
          this.linhas[linha].bloco[this.calcularPosicaoDaPalavraNoBloco( address )] = value
          this.linhas[linha].is_Altered = true
        }else{
          if (this.linhas[linha].is_Altered){
            this.ram.persistirBloco(address, this.linhas[linha].bloco)
            this.ram.buscarBloco( address ).then( bloco => {
              this.linhas[linha] = new Linha( this._tam_bloco, tag, bloco )
            })
          }else{
            this.ram.buscarBloco( address ).then( bloco => {
              this.linhas[linha] = new Linha( this._tam_bloco, tag, bloco)
            })
          }

          this.linhas[linha].bloco[this.calcularPosicaoDaPalavraNoBloco( address )] = value
          this.linhas[linha].is_Altered = true
        }
        resolve()
      })
  }


}
