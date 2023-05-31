export class Linha {
  tag: number
  is_Altered: boolean = false;
  _contador_LRU: number;
  _contador_LFU: number;
  bloco: Uint8Array = new Uint8Array()

  constructor(tag: number,tam_bloco: number , bloco: Uint8Array) {
    this.tag = tag;
    this.bloco = new Uint8Array(tam_bloco);
    this.bloco = bloco
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
