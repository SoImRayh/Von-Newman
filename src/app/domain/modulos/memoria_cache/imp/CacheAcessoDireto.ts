import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM }from "../../memoria_ram/MemRAM";
import { add } from "husky";
import { Bloco } from "@/app/domain/modulos/memoria_cache/imp/types/Bloco";

type Props = {
  size: number;
  ram?: MemRAM;
}

type bloco = {
  data: number[]
}

type linha = {

  tag: number
  bloco: number[]
}
export class CacheAcessoDireto implements MemoriaCache {

  private ram: MemRAM;
  private linhas: linha[]
  private _totalDeBuscas: number = 0;
  private _totalDeMiss: number = 0;
  private _totalDeHit: number = 0;

  constructor(qtd_linhas: number, tam_bloco: number, ram?: MemRAM) {


    if(ram){
      this.ram = ram;
    }else {
      //TODO implementar os tamanho default no arquivo de configuração
      this.ram = new MemRAM(512)
    }

  }
  buscar(address: number): Promise<number> {
    return new Promise( (resolve) => {

      const bloco = Math.floor(address/tamanhodobloco)
      const pos_palavra_no_bloco = address % tamanhodobloco

      const linha = bloco % qtd_linhas

      const bloco_TARGET = this.linhas[linha]

      if(calctag() == bloco_TARGET.tag){
        this._totalDeHit++
        return bloco_TARGET.bloco[pos_palavra_no_bloco]
      }else {

      }



      //TODO implementar a busca
      //if adress está na cache, _totalDeBuscas++ e _totaldeHit++
      //else _totalDeBuscas++ e _totalDeMiss++

      const value : number = this.view[address]
      this._totalDeBuscas++
      this._totalDeMiss++
      this._totalDeHit++
      resolve(value)
    });
  }

  getHitRatio(): number {
    return this._totalDeHit / this._totalDeBuscas;
  }

  getMissRatio(): number {
    return this._totalDeMiss / this._totalDeBuscas;
  }

  //TODO remover assim que acabar as implementações
  salvar(address: number, value: number): void {
    this.view[address] = value
  }

}
