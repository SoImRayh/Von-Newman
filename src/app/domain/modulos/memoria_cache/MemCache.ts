export class MemCache{

  buffer: ArrayBuffer;

  view: Uint8Array;
  constructor(tam: number) {
    this.buffer= new ArrayBuffer(tam);
    this.view= new Uint8Array(this.buffer)
  }
}
