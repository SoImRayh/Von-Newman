import { Instruction } from "@/app/domain/interfaces/Instruction";
import Processador from "@/app/domain/modulos/processador/Processador";

/* RV32I was designed to be sufficient to form a compiler target and to support modern operating
system environments. The ISA was also designed to reduce the hardware required in a minimal
implementation. RV32I contains 40 unique instructions, though a simple implementation might
cover the ECALL/EBREAK instructions with a single SYSTEM hardware instruction that al-
ways traps and might be able to implement the FENCE instruction as a NOP, reducing base
instruction count to 38 total. */

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
  {
    nome: 'slti',
    descricao: 'set less than immediate, places the value 1 in register rd if register rs1 is less than the immediate else 0 is written to rd',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
  {
    nome: 'add',
    descricao: 'operação de soma sem sinal',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
  {
    nome: 'and',
    descricao: 'operador E logico',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
  {
    nome: 'or',
    descricao: 'Operador OR = ou logico',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
  {
    nome: 'xor',
    descricao: 'Operador XOR = ou exclusivo logico',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
  {
    nome: 'srli',
    descricao: 'Deslocamneto de bits a direita, SRLI is a logical right shift (zeros are shifted into the upper bits)',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
  {
    nome: 'srai',
    descricao: 'SRAI is an arithmetic right shift (the original sign bit is copied into the vacated upper bits)',
    opcode:0x00,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise( resolve => {
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
