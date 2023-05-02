import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";


class Linha {
  tag: number
  is_Altered: boolean = false;
  acces_count: number;
  bloco: number[] = []

  constructor(tam_bloco: number) {
    for (let i = 0; i < tam_bloco; i++) {
      this.bloco.push(0)
    }
  }

   salvar (addres: number, val: number): void {
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
  _overwrite_police: OverwritePolice
  _missRatio: number
  _hitRatio: number
  _Buscas: number

  constructor(qtd_linhas: number, tam_bloco: number, overidePolice: OverwritePolice) {
    this._overwrite_police = overidePolice
    for (let i = 0; i < qtd_linhas; i++) {
      this.linhas.push(new Linha(tam_bloco))
    }
  }
  buscar(address: number): Promise<number> {
    return new Promise( resolve => {
      //if estiver na cache

      //if errar
      switch (this._overwrite_police) {
        case OverwritePolice.FIFO:
          
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
     this.linhas[address/2].salvar(address, value)
  }
}
