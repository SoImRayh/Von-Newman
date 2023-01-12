import { Instruction } from "@/app/domain/interfaces/Instruction";
import Processador from "@/app/domain/Processador";

export const riscV: Instruction[] = [
  {
    nome: 'soma',
    descricao: 'faz uma soma',
    opcode: 0x01,
    execute: () => {
      console.log("estou somando")
    }
  },
  {
    nome: 'hlt',
    descricao: 'nao altera nenhum registrador na máquina',
    opcode:0x0,
    execute: (processador: Processador) => {
      processador.PC++
    }
  }
]

