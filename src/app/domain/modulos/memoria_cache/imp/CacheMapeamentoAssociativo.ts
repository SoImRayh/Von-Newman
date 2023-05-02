import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import { add } from "husky";


export class Linha {
  tag: number
  is_Altered: boolean = false;
  acces_count: number;
  bloco: number[] = []

  constructor(tam_bloco: number) {
    for (let i = 0; i < tam_bloco; i++) {
      this.bloco.push(0)
    }
  }

   salvar (tag:number, bloco: number, word: number, addres: number, val: number): void {
    //if esta suja
     if (this.is_Altered){

     }
     //se limpo
     else{
       this.tag = tag
       this.bloco[word] = val
       this.is_Altered = !this.is_Altered
     }
      this.bloco[addres/2] = val
      this.is_Altered = true
  }
}

export enum OverwritePolice {
  FIFO = 0

}

export class CacheMapeamentoAssociativo implements MemoriaCache{

  ram: MemRAM
  linhas: Linha[] = []
  _tam_campo_word: number
  _tam_campo_bloco: number
  _tam_campo_tag: number
  _qtd_linhas: number
  _tam_bloco: number
  _overwrite_police: OverwritePolice
  _missRatio: number
  _hitRatio: number
  _Buscas: number


  constructor(qtd_linhas: number, tam_bloco: number, overidePolice: OverwritePolice) {

    this._tam_bloco = Math.log2(qtd_linhas)
    this._tam_campo_word = Math.log2(tam_bloco)

    this._overwrite_police = overidePolice
    for (let i = 0; i < qtd_linhas; i++) {
      this.linhas.push(new Linha(tam_bloco))
    }
  }
  buscar(address: number): Promise<number> {
    return new Promise( resolve => {
      //TODO implementar as buscas
      const tag = address >> 3
      const linha : Linha | undefined = this.linhas.find(linha => linha.tag == tag )


      if ( linha ){
        linha.acces_count++
        return linha.bloco[calcularPos()]
      }else {
        switch (this._overwrite_police) {
          case OverwritePolice.FIFO:

        }
      }

    });
  }

  getHitRatio(): number {
    return 0;
  }

  getMissRatio(): number {
    return 0;
  }

  salvar(address: number, value: number): void {
    const bloco: number = this.calcular_bloco( address )
    const word: number = this.calcular_word( address )
    const tag: number = this.calcular_tag( address )


     this.linhas[bloco].salvar(tag, word, bloco, address, value)
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


}
