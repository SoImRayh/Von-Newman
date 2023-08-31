export interface Instruction {
      nome: string;
      opcode: number
      descricao: string
      formato: {
        opr_qtd: number,
        opr_tam: number[]
      }
      decode: any
      execute: any
}

