export interface Instruction {
  nome: string;
  opcode: number
  descricao: string
  formato: {
    opr_qtd: number,
    opr_tam: number[]
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  decode: Function
  // eslint-disable-next-line @typescript-eslint/ban-types
  execute: Function

}

