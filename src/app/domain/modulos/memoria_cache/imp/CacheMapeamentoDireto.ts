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
   _totalDeBuscas: number = 0;
   _totalDeMiss: number = 0;
   _totalDeHit: number = 0;

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
  buscar(address: number): Promise<number> {

    this.linhas.forEach(linha => {
      console.log(linha)
    })
    return new Promise( (resolve) => {

      const bloco: number = this.calcularBloco( address )
      const pos_palavra_no_bloco: number =
        this.CalcularPosicaoDaPalavraNoBloco( address )
      const linha = this.calcularLinha( address )
      const bloco_TARGET = this.linhas[linha]

      if(this.calctag(address) == bloco_TARGET.tag){
        this._totalDeHit++
        resolve(bloco_TARGET.bloco[pos_palavra_no_bloco])
      }else {

      }
      //TODO implementar a busca
      //if address está na cache, _totalDeBuscas++ e _totaldeHit++
      //else _totalDeBuscas++ e _totalDeMiss++

      this._totalDeBuscas++
      this._totalDeMiss++
      this._totalDeHit++
      resolve(NaN)
    });
  }

  private calctag(address: number): number {

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
  private CalcularPosicaoDaPalavraNoBloco(address: number){
    return address % this._tam_bloco
  }


    /*
    * A linha é calculada tomando o resto da divisao do bloco pela quantidade de linhas
    * */
  private calcularLinha(address: number): number {
    return this.calcularBloco( address ) % this._qtd_linhas
  }

  getHitRatio(): number {
    return this._totalDeHit / this._totalDeBuscas;
  }

  getMissRatio(): number {
    return this._totalDeMiss / this._totalDeBuscas;
  }

  getTotalSize(): number {
    return this._qtd_linhas * this._tam_bloco ;
  }

  getLinhas():  Linha[] {
    return this.linhas
  }


  //TODO remover assim que acabar as implementações
  salvar(address: number, value: number): Promise<void> {
      return new Promise<void>((resolve, reject) => {
          /*
* Calcular o a quantidade de bits destinados a palavra em um endereço
* */
          const tam_word: number = Math.log2(this._tam_bloco)

          /*
          * Calcular */

          const tam_r: number = Math.log2(this._qtd_linhas)

          const tag : number = ((address >> tam_r) >> tam_word)
          this.linhas[this.calcularLinha(address)].tag = tag
          this.linhas[this.calcularLinha(address)].bloco[this.CalcularPosicaoDaPalavraNoBloco(address)] = value
          this.ram.gravar(address, value)
          resolve()
      })
  }

}
