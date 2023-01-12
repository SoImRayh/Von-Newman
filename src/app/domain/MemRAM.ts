import { ramClock } from "@/app/domain/Clocks";

class MemRAM {

  buffer : ArrayBuffer

  view : Int8Array
  constructor(byteSize: number) {
    this.buffer = new ArrayBuffer(byteSize);
    this.view = new Int8Array(this.buffer);
  }


   buscar(pos: number): number {
    return this.view[pos];
  }

  gravar(pos: number, data: number){
    setTimeout(() => {
      this.view[pos] = data
    })
  }
}

export default MemRAM
