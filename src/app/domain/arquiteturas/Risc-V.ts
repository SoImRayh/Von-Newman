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
  {
    nome: 'slli',
    descricao: 'SLLI is a logical left shift (zeros are shifted into the lower bits)',
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
    nome: 'lui',
    descricao: 'LUI (load upper immediate) places immediate value in the top 20 bits of the destination register rd',
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
    nome: 'auipc',
    descricao: 'AUIPC (add upper immediate to pc) then places the result in register rd.',
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
    nome: 'sll',
    descricao: 'SLL perform logical left',
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
    nome: 'srl',
    descricao: 'SRL perform a logical right',
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
    nome: 'jal',
    descricao: 'JAL (jump) stores the address of the instruction following the jump (pc+4) into register rd',
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
    nome: 'jalr',
    descricao: 'JALR (jump and link register)',
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
  /*BEQ and BNE take the branch if registers rs1 and rs2
  are equal or unequal respectively. */
  {
    nome: 'beq',
    descricao: 'BEQ take the branch if registers rs1 and rs2 are equal or unequal respectively',
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
  /* BLT and BLTU take the branch if rs1 is less than rs2, using
  signed and unsigned comparison respectively.*/
  {
    nome: 'blt',
    descricao: 'BLT take the branch if rs1 is less than rs2',
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
  /*BGE and BGEU take the branch if rs1 is greater than or equal 
  to rs2, using signed and unsigned comparison respectively.*/
  {
    nome: 'bge',
    descricao: 'take the branch if rs1 is greater than or equal to rs2',
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
    nome: 'lw',
    descricao: 'The LW instruction loads a 32-bit value from memory into rd',
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
    nome: 'lh',
    descricao: 'LH loads a 16-bit value from memory, then sign-extends to 32-bits before storing in rd',
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
    nome: 'lhu',
    descricao: 'LHU loads a 16-bit value from memory but then zero extends to 32-bits before storing in rd',
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
    nome: 'sw',
    descricao: 'store 32-bit values from the low bits of register rs2 to memory',
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
    nome: 'sh',
    descricao: 'store 16-bit values from the low bits of register rs2 to memory',
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
    nome: 'sb',
    descricao: 'store 8-bit values from the low bits of register rs2 to memory',
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
