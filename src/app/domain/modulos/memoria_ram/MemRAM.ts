import { ramClock } from "@/app/domain/Clocks";
import { ProgramaCompilado } from "@/app/domain/interfaces/ProgramaCompilado";
import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";

export class MemRAM {

  buffer : ArrayBuffer
  view : Uint8Array
  asArray: number[]
  _tam_bloco: number

  constructor(byteSize: number, _tam_bloco: number) {
    this._tam_bloco = _tam_bloco
    this.buffer = new ArrayBuffer(byteSize)
    this.view = new Uint8Array(this.buffer)
    this.asArray = Array.from(this.view)
  }


   async buscar(pos: number, tam_bloco: number): Promise<Uint8Array> {
    return new Promise( resolve => {

      //vetor de bytes a ser retornado como o bloco
      const bloco  = this.view.slice(pos, (pos + tam_bloco))

      // let word : number  = 0x0
      // word = this.view[pos] << 0x8;
      // word = (word | this.view[pos+0x1]) << 0x8;
      // word = (word | this.view[pos+0x2]) << 0x8;
      // word = (word | this.view[pos+0x3]);
      resolve(bloco);
    })
  }
  gravar(pos: number, val: number){

  }

  async carregarPrograma(bytecode :  ProgramaCompilado[]): Promise<void> {
    return new Promise( (resolve) => {
      bytecode.forEach( (data) => {

        const val = data.valor;

        const byte0 = val >>> 24
        const byte1 = (val >>> 16) & 0x00ff;
        const byte2 = (val >>> 8 ) & 0x0000ff
        const byte3 = (val) & 0x0000ff


        this.view[data.posicao] = byte0;
        this.view[data.posicao+0x1] = byte1;
        this.view[data.posicao+0x2] = byte2;
        this.view[data.posicao+0x3] = byte3;

        this.asArray = Array.from(this.view)
        resolve()
      })
    })
  }

  persistirBloco(endereco_inicial: number, bloco: Uint8Array) {
    for (let i = 0; i < bloco.length; i++) {
      this.view[endereco_inicial + i ] = bloco[ i ]
    }
  }

  buscarBloco( address: number): number[]{
    return [0x0]
  }
}


