export interface Instruction {
  nome: string;
  opcode: number
  descricao: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  execute: Function

}

