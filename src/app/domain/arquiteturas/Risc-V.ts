import { Instruction } from "@/app/domain/interfaces/Instruction";
import RiscV from "@/app/domain/modulos/processador/ProcessadorRisV";

/* RV32I was designed to be sufficient to form a compiler target and to support modern operating
system environments. The ISA was also designed to reduce the hardware required in a minimal
implementation. RV32I contains 40 unique instructions, though a simple implementation might
cover the ECALL/EBREAK instructions with a single SYSTEM hardware instruction that al-
ways traps and might be able to implement the FENCE instruction as a NOP, reducing base
instruction count to 38 total. */

/* 
  Type R 0~6 opcode | 7~11 RD           12~14 funct3 | 15~19 RS1 | 20~24 RS2
  Type I 0~6 opcode | 7~11 RD           12~14 funct3 | 15~19 RS1 | IMM[11:10]
  Type S 0~6 opcode | 7~11 IMM[4:0]     12~14 funct3 | 15~19 RS1 | 20~24 RS2
  Type B 0~6 opcode | 7~11 IMM[4:1|11]  12~14 funct3 | 15~19 RS1 | 20~24 RS2
  Type U 0~6 opcode | 7~11 RD           12~14 funct3 | 15~19 RS1 | IMM
  Type J 0~6 opcode | 7~11 RD           12~14 funct3 | 15~19 RS1 | IMM
*/

export const RISCV: Instruction[] = [
  {
    nome: 'addi',
    descricao: 'adds the sign-extended 12-bit immediate to register rs1',
    opcode:0b0010011,
    formato : {
      opr_qtd: 4,
      opr_tam: [5,3,5,12]
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.XLEN[RiscV.RS1] + RiscV.XLEN[RiscV.IMM]
        resolve()
      })
    },
  },
  {
    nome: 'slti',
    descricao: 'set less than immediate, places the value 1 in register rd if register rs1 is less than the immediate else 0 is written to rd',
    opcode:0b0010011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        if (RiscV.RS1 < RiscV.IMM) {
          RiscV.XLEN[RiscV.RD] = 0x01;
        } else {
          RiscV.XLEN[RiscV.RD] = 0x00;
        }
        resolve()
      })
    },
  },
  {
    nome: 'add',
    descricao: 'operação de soma sem sinal',
    opcode:0b0010011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x00f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x1f00000) >> 20;
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = (RiscV.XLEN[RiscV.RS1] + RiscV.XLEN[RiscV.RS2])
        resolve()
      })
    },
  },
  {
    nome: 'and',
    descricao: 'operador E logico',
    opcode:0b0110011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x00f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x1f00000) >> 20;
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = (RiscV.XLEN[RiscV.RS1] & RiscV.XLEN[RiscV.RS2])
        resolve()
      })
    },
  },
  {
    nome: 'or',
    descricao: 'Operador OR = ou logico',
    opcode:0b0110011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x00f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x1f00000) >> 20;
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = (RiscV.XLEN[RiscV.RS1] | RiscV.XLEN[RiscV.RS2])
        resolve()
      })
    },
  },
  {
    nome: 'xor',
    descricao: 'Operador XOR = ou exclusivo logico',
    opcode:0b0110011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x00f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x1f00000) >> 20;
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = (RiscV.XLEN[RiscV.RS1] ^ RiscV.XLEN[RiscV.RS2])
        resolve()
      })
    },
  },
  {
    nome: 'srli',
    descricao: 'Deslocamneto de bits a direita, SRLI is a logical right shift (zeros are shifted into the upper bits)',
    opcode:0b0010011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.XLEN[RiscV.RS1] >> RiscV.XLEN[RiscV.IMM]
        resolve()
      })
    },
  },
  {
    nome: 'srai',
    descricao: 'SRAI is an arithmetic right shift (the original sign bit is copied into the vacated upper bits)',
    opcode:0b0010011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.XLEN[RiscV.RS1] >> RiscV.XLEN[RiscV.IMM]
        resolve()
      })
    },
  },
  {
    nome: 'slli',
    descricao: 'SLLI is a logical left shift (zeros are shifted into the lower bits)',
    opcode:0b0010011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.XLEN[RiscV.RS1] << RiscV.XLEN[RiscV.IMM]
        resolve()
      })
    },
  },
  {
    nome: 'lui',
    descricao: 'LUI (load upper immediate) places immediate value in the top 20 bits of the destination register rd',
    opcode:0b0110111,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.IMM = (RiscV.MBR & 0xfffff000) >> 12;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.IMM;
        resolve()
      })
    },
  },
  {
    nome: 'auipc',
    descricao: 'AUIPC (add upper immediate to pc) then places the result in register rd.',
    opcode:0b0010111,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.IMM = (RiscV.MBR & 0xfffff000) >> 12;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.IMM;
        resolve()
      })
    },
  },
  {
    nome: 'sll',
    descricao: 'SLL perform logical left',
    opcode:0b0110011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x00f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x1f00000) >> 20;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.XLEN[RiscV.RS1] << RiscV.XLEN[RiscV.RS2]
        resolve()
      })
    },
  },
  {
    nome: 'srl',
    descricao: 'SRL perform a logical right',
    opcode:0b0110011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x00f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x1f00000) >> 20;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.XLEN[RiscV.RD] = RiscV.XLEN[RiscV.RS1] << RiscV.XLEN[RiscV.RS2]
        resolve()
      })
    },
  },
  {
    nome: 'jal',
    descricao: 'JAL (jump) stores the address of the instruction following the jump (pc+4) into register rd',
    opcode:0b1101111,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.IMM = (RiscV.MBR & 0xfffff000) >> 12;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
  {
    nome: 'jalr',
    descricao: 'JALR (jump and link register)',
    opcode:0b1100111,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
  /*BEQ and BNE take the branch if registers rs1 and rs2
  are equal or unequal respectively. */
  {
    nome: 'beq',
    descricao: 'BEQ take the branch if registers rs1 and rs2 are equal or unequal respectively',
    opcode:0b1100011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
  /* BLT and BLTU take the branch if rs1 is less than rs2, using
  signed and unsigned comparison respectively.*/
  {
    nome: 'blt',
    descricao: 'BLT take the branch if rs1 is less than rs2',
    opcode:0b1100011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
  /*BGE and BGEU take the branch if rs1 is greater than or equal 
  to rs2, using signed and unsigned comparison respectively.*/
  {
    nome: 'bge',
    descricao: 'take the branch if rs1 is greater than or equal to rs2',
    opcode:0b1100011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
  {
    nome: 'lw',
    descricao: 'The LW instruction loads a 32-bit value from memory into rd',
    opcode:0b0000011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.ram.buscar(RiscV.RD).then( data => {
          RiscV.XLEN[RiscV.RS1] = data
          RiscV.PC += 4
          resolve()
        })
      })
    },
  },
  {
    nome: 'lh',
    descricao: 'LH loads a 16-bit value from memory, then sign-extends to 32-bits before storing in rd',
    opcode:0b0000011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.ram.buscar(RiscV.RD).then( data => {
          RiscV.XLEN[RiscV.RS1] = data
          RiscV.PC += 2
          resolve()
        })
      })
    },
  },
  {
    nome: 'lhu',
    descricao: 'LHU loads a 16-bit value from memory but then zero extends to 32-bits before storing in rd',
    opcode:0b0000011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        resolve()
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.IMM = (RiscV.MBR & 0xfff00000) >> 7;
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.ram.buscar(RiscV.RD).then( data => {
          RiscV.XLEN[RiscV.RS1] = data
          RiscV.PC += 2
          resolve()
        })
      })
    },
  },
  {
    nome: 'sw',
    descricao: 'store 32-bit values from the low bits of register rs2 to memory',
    opcode:0b0100011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
  },
  {
    nome: 'sh',
    descricao: 'store 16-bit values from the low bits of register rs2 to memory',
    opcode:0b0100011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
  {
    nome: 'sb',
    descricao: 'store 8-bit values from the low bits of register rs2 to memory',
    opcode:0b0100011,
    formato : {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (RiscV: RiscV): Promise<void> => {
      return new Promise( resolve => {
        RiscV.RD = (RiscV.MBR & 0x00f80) >> 7;
        RiscV.RS1 = (RiscV.MBR & 0x000f8000) >> 15;
        RiscV.RS2 = (RiscV.MBR & 0x01f00000) >> 20;
        RiscV.IMM = (RiscV.MBR & 0xfe000000) >> 25;
        resolve()
      })
    },
    execute: async (RiscV: RiscV) : Promise<void> => {
      return new Promise( resolve => {
          resolve()
      })
    },
  },
]
