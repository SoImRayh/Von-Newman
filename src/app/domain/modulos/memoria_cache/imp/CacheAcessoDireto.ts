import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import MemRAM from "@/app/domain/modulos/memoria_ram/MemRAM";

type Props = {
  size: number;
  ram?: MemRAM;
}
export class CacheAcessoDireto implements MemoriaCache {

  private readonly buffer : ArrayBuffer;
  private view: Uint8Array;
  private ram: MemRAM;
  private _totalDeBuscas: number = 0;
  private _totalDeMiss: number = 0;
  private _totalDeHit: number = 0;

  constructor(props : Props) {
    this.buffer = new ArrayBuffer(props.size);
    this.view = new Uint8Array(this.buffer);

    if(props.ram){
      this.ram = props.ram;
    }else {
      //TODO implementar os tamanho default no arquivo de configuração
      this.ram = new MemRAM(512)
    }

  }
  buscar(address: number): Promise<number> {
    return new Promise( (resolve) => {
      //TODO implementar a busca
      //if adress está na cache, _totalDeBuscas++ e _totaldeHit++
      //else _totalDeBuscas++ e _totalDeHits++
      resolve(0)
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
  }

}
