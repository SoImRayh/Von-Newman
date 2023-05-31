export class Linha {
  tag: number
  is_Altered: boolean = false;
  count: number;
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
