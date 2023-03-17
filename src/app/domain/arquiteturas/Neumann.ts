import { Instruction } from "@/app/domain/interfaces/Instruction";
import Processador from "@/app/domain/modulos/processador/Processador";

export const NEWMAN: Instruction[] = [
    {
        nome: 'hlt',
        descricao: 'nao altera nenhum registrador na máquina',
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
        nome: 'nop',
        descricao: 'altera somente o PC - No Operation',
        opcode: 0x01,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise( resolve => {
          resolve()
        })
      },
        execute: async (processador: Processador): Promise<void> =>  {
          return new Promise( resolve => {
            processador.PC +=4;
            resolve()
          })
        }
    },
    {
        nome: 'add',
        descricao: 'Soma 2 registradores',
        opcode: 0x02,
        formato : {
        opr_qtd: 2,
        opr_tam: [3,3]
      },
      decode: async (processador: Processador) : Promise<void> => {
        return new Promise( resolve => {
          processador.RO0 = (processador.MBR >>> 21) & 0x00e;
          processador.RO1 = (processador.MBR >>> 18) & 0x001c;
          resolve()
        })
      },
        execute: async (processador: Processador): Promise<void> => {
          return new Promise( resolve => {
            processador.GPR[processador.RO0] += processador.GPR[processador.RO1]
            processador.PC += 4
            resolve()
          })
        }
    },
    {
        nome: 'sub',
        descricao: 'Subtrai 2 registradores',
        opcode: 0x03,
        formato : {
        opr_qtd: 2,
        opr_tam: [3,3]
        },
        decode:async (processador: Processador): Promise<void> => {
          return new Promise( resolve => {
              processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
            processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
            resolve()
          })
        },
        execute:async (processador: Processador): Promise<void> => {
          return new Promise( resolve => {
            processador.GPR[processador.RO0] -= processador.GPR[processador.RO1]
            processador.PC += 4
            resolve()
          })
        }
    },
    {
        nome: 'mul',
        descricao: 'Multiplica 2 registradores',
        opcode: 0x04,
      formato : {
        opr_qtd: 2,
        opr_tam: [3,3]
      },
      decode: async (processador: Processador): Promise<void>  =>{
        return new Promise( resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21
          processador.RO1 = (processador.MBR & 0x001c0000) >> 18
          resolve()

        })
      }
      ,
      execute: async (processador: Processador): Promise<void> => {
        return new Promise( resolve => {
          processador.GPR[processador.RO0] *= processador.GPR[processador.RO1]
          processador.PC +=4
          resolve()
        })
      }
    },
    {
        nome: 'div',
        descricao: 'Dividi 2 registradores',
        opcode: 0x05,
      formato : {
        opr_qtd: 2,
        opr_tam: [3,3]
      },
        decode: async (processador: Processador): Promise<void>  =>{
          return new Promise( resolve => {
            processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
            processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
            resolve()
          })
        }
        ,
        execute: async (processador: Processador): Promise<void> => {
          return new Promise( resolve => {
            processador.GPR[processador.RO0] /= processador.GPR[processador.RO1]
            processador.PC +=4
            resolve()
          })
        }
    },
    {
        nome: 'cmp',
        descricao: 'Compara o conteudo dos registradores e preenche os registradores E, L, G',
        opcode: 0x06,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if(processador.GPR[processador.RO0] == processador.GPR[processador.RO1])
          {
            processador.E = 1;
          }
          else if (processador.GPR[processador.RO0] < processador.GPR[processador.RO1])
          {
            processador.L = 1;
          } 
          else if (processador.GPR[processador.RO0] > processador.GPR[processador.RO1])
          {
            processador.G = 1;
          }
          processador.PC +=4;
          resolve()
        })
      },
    },
    {
        nome: 'movr',
        descricao: 'Move o conteudo de um registrador para o outro',
        opcode: 0x07,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] = processador.GPR[processador.RO1];
          processador.PC +=4;
          resolve()
        })
      },
    },
    {
        nome: 'and',
        descricao: 'Operador logico AND = E',
        opcode: 0x08,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] & processador.GPR[processador.RO1];
          processador.PC +=4;
          resolve()
        })
      },
    },
    {
        nome: 'or',
        descricao: 'Operador logico OR = OU',
        opcode: 0x09,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] | processador.GPR[processador.RO1];
          processador.PC +=4;
          resolve()
        })
      },
    },
    {
        nome: 'xor',
        descricao: 'Operador logico XOR',
        opcode: 0xa,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.RO1 = (processador.MBR & 0x001c0000) >> 18;
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] ^ processador.GPR[processador.RO1];
          processador.PC +=4;
          resolve()
        })
      },
    },
    {
        nome: 'not',
        descricao: 'Operador logico NOT, negação logica',
        opcode: 0x0b,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          !processador.GPR[processador.RO1];
          processador.PC +=4;
          resolve()
        })
      },
    },
    {
        nome: 'je',
        descricao: 'Jump if equal to: muda o endereço do Pc para X caso E = 1',
        opcode: 0x0c,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if (processador.E == 1){
            processador.PC = processador.MAR;
          }
          resolve()
        })
      },
    },
    {
        nome: 'jne',
        descricao: 'Jump if not equal to: Muda o endereço do PC para x caso E = 0',
        opcode: 0x0d,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if (processador.E == 0){
            processador.PC = processador.MAR;
          }
          resolve()
        })
      },
    },
    {
        nome: 'jl',
        descricao: 'Jump if lower than: Muda o endereço do PC para X caso L = 1',
        opcode: 0x0e,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if (processador.L == 1){
            processador.PC = processador.MAR;
          }
          resolve()
        })
      },
    },
    {
        nome: 'jle',
        descricao: 'Muda o valor de PC para X caso E = 1 ou L = 1',
        opcode: 0x0f,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if (processador.E == 1 || processador.L == 1){
            processador.PC = processador.MAR;
          }
          resolve()
        })
      },
    },
    {
        nome: 'jg',
        descricao: 'Jump if greater than; Muda o valor de PC para X caso G = 1',
        opcode: 0x10,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if (processador.G == 1){
            processador.PC = processador.MAR;
          }
          resolve()
        })
      },
    },
    {
        nome: 'jge',
        descricao: 'Muda o valor de PC para X caso G = 1 ou E = 1',
        opcode: 0x11,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          if (processador.E == 1 || processador.G == 1){
            processador.PC = processador.MAR;
          }
          resolve()
        })
      },
    },
    {
        nome: 'jmp',
        descricao: 'JUMP Muda o PC para o endereço de memoria X',
        opcode: 0x12,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.MAR = (processador.MBR & 0x001fffff);
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.PC = processador.MAR;
          resolve()
        })
      },
    },
    {
        nome: 'ld',
        descricao: 'carrega para o registrador X uma palavra da memória de 32 bits que se inicia no endereço Y',
        opcode: 0x13,
        formato : {
          opr_qtd: 2,
          opr_tam: [3,21]
        },
        decode:async (processador: Processador): Promise<void> => {
          return new Promise( resolve => {
            processador.MAR = processador.MBR & 0x001fffff
            processador.RO0 = (processador.MBR >> 21) & 0x007
            resolve()
          })
        },
        execute: async (processador: Processador): Promise<void> => {
          return new Promise( resolve => {
            processador.ram.buscar(processador.MAR).then( data => {
              processador.GPR[processador.RO0] = data
              processador.PC += 4
              resolve()
            })
          })
        }
    },
    {
        nome: 'st',
        descricao: 'armazena uma palavra de 32 bits que começa a partir do endereço de memória Y o conteúdo do registrador X',
        opcode: 0x14,
      formato : {
        opr_qtd: 2,
        opr_tam: [3,21]
      },decode: async (processador: Processador): Promise<void>  =>{
        return new Promise( resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.MAR = (processador.MBR & 0x001fffff)
          resolve()
        })
      }
      ,
      execute: async (processador: Processador): Promise<void> => {
        return new Promise( resolve => {
          processador.ram.gravar(processador.MAR, processador.GPR[processador.RO0]).then( () => {
            processador.PC += 4;
            resolve()
            }
          )
        })
      }
    },
  {
    nome: 'movi',
    descricao: 'O registrador informado recebe o imediato',
    opcode: 0x15,
    formato: {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise(resolve => {
        processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
        processador.IMM = (processador.MBR & 0x001fffff)
        resolve()
      })
    },
    execute: async (processador: Processador): Promise<void> => {
      return new Promise(resolve => {
        processador.GPR[processador.RO0] = processador.IMM;
        processador.PC +=4;
        resolve()
      })
    },
  },
  {
    nome: 'addi',
    descricao: 'O registrador informado recebe o imediato',
    opcode: 0x16,
    formato: {
      opr_qtd: NaN,
      opr_tam: []
    },
    decode: async (processador: Processador): Promise<void> => {
      return new Promise(resolve => {
        processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
        processador.IMM = (processador.MBR & 0x001fffff)
        resolve()
      })
    },
    execute: async (processador: Processador): Promise<void> => {
      return new Promise(resolve => {
        processador.GPR[processador.RO0] = processador.GPR[processador.RO0] + processador.IMM;
        processador.PC +=4;
        resolve()
      })
    },
  },
    {
        nome: 'subi',
        descricao: 'O registrador informado e subtraido pelo imediato',
        opcode: 0x17,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.IMM = (processador.MBR & 0x001fffff)
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] = processador.GPR[processador.RO0] - processador.IMM;
          processador.PC +=4;
          resolve()
        })
      }
      },
    {
        nome: 'muli',
        descricao: 'O registrador informado e multiplicado pelo imediato',
        opcode: 0x18,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.IMM = (processador.MBR & 0x001fffff)
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] = processador.GPR[processador.RO0] * processador.IMM;
          processador.PC +=4;
          resolve()
        })
      }
      },
    {
        nome: 'divi',
        descricao: 'O registrador informado e dividido pelo imediato',
        opcode: 0x19,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.IMM = (processador.MBR & 0x001fffff)
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] = processador.GPR[processador.RO0] / processador.IMM;
          processador.PC +=4;
          resolve()
        })
      }
      },
    {
        nome: 'lsh',
        descricao: 'desloca a palavra no registrador X em IMM bits à esquerda',
        opcode: 0x1a,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.IMM = (processador.MBR & 0x001fffff)
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
            processador.GPR[processador.RO0] << processador.IMM;
            processador.PC +=4;
            resolve()
        })
      }
      },
    {
        nome: 'rsh',
        descricao: 'desloca a palavra no registrador X em IMM bits à direita',
        opcode: 0x1b,
      formato : {
        opr_qtd: NaN,
        opr_tam: []
      },
      decode: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.RO0 = (processador.MBR & 0x00e00000) >> 21;
          processador.IMM = (processador.MBR & 0x001fffff)
          resolve()
        })
      },
      execute: async (processador: Processador): Promise<void> => {
        return new Promise(resolve => {
          processador.GPR[processador.RO0] >> processador.IMM;
          processador.PC +=4;
          resolve()
      })
      }
      },
]
//Arquitetura adaptada do trabalho de AOC I
// Conjunto de instruções do IAS
