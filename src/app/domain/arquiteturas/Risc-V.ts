import { Instruction } from "@/app/domain/interfaces/Instruction";
import Processador from "@/app/domain/modulos/processador/Processador";

export const NEWMAN: Instruction[] = [
  {
    nome: 'addi',
    descricao: 'adds the sign-extended 12-bit immediate to register rs1',
    opcode:0x00,
    formato : {
      opr_qtd: 4,
      opr_tam: [5,3,5,12]
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
        processador.RO0 = (processador.MBR >>> 21) & 0x00e;
        resolve()
      })
    },
    execute: async (processador: Processador) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
        }
      )
    },
  },
]
