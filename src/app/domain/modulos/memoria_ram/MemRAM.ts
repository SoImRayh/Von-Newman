import { ramClock } from "@/app/domain/Clocks";
import { ProgramaCompilado } from "@/app/domain/interfaces/ProgramaCompilado";
import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";

export class MemRAM {

  buffer : ArrayBuffer
  view : Uint8Array
  asArray: number[]
  _tamanho_do_bloco: number;
  constructor(byteSize: number) {
    this.buffer = new ArrayBuffer(byteSize);
    this.view = new Uint8Array(this.buffer);
    this.asArray = Array.from(this.view);
  }


  buscar(pos: number): number{
      return  this.view[pos]

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
  buscar_bloco(initial_addres: number, tam_bloco: number){
    const toReturn : number[] = [];
    this.view.slice(initial_addres, initial_addres + tam_bloco).forEach( val => toReturn.push(val))
    return toReturn
  }

  persistir(initial_address: number, bloco: number[]) {
    for (let i = 0; i < bloco.length; i++) {
      this.view[initial_address+i] = bloco[i]
    }
  }
}


