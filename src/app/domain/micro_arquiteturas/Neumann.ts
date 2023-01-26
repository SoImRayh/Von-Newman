import { Instruction } from "@/app/domain/interfaces/Instruction";
import Processador from "@/app/domain/Processador";

export const neumann: Instruction[] = [
    {
        nome: 'hlt',
        descricao: 'nao altera nenhum registrador na máquina',
        opcode:0x0,
        execute: (processador: Processador) => {
            processador.PC++
        }
    },
    {
        nome: 'nop',
        descricao: 'altera somente o PC - No Operation',
        opcode: 0x01,
        execute: (processador: Processador) => {
            processador.PC++
        }
    },
    {
        nome: 'add',
        descricao: 'Soma 2 registradores',
        opcode: 0x02,
        execute: (processador: Processador) => {

        }
    },
    {
        nome: 'sub',
        descricao: 'Subtrai 2 registradores',
        opcode: 0x03,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'mul',
        descricao: 'Multiplica 2 registradores',
        opcode: 0x04,
        execute: (processador: Processador) => {

        }
    },
    {
        nome: 'div',
        descricao: 'Dividi 2 registradores',
        opcode: 0x05,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'cmp',
        descricao: 'Compara o conteudo dos registradores e preenche os registradores E, L, G',
        opcode: 0x06,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'movr',
        descricao: 'Move o conteudo de um registrador para o outro',
        opcode: 0x07,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'and',
        descricao: 'Operador logico AND = E',
        opcode: 0x08,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'or',
        descricao: 'Operador logico OR = OU',
        opcode: 0x09,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'xor',
        descricao: 'Operador logico XOR',
        opcode: 0x10,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'not',
        descricao: 'Operador logico NOT, negação logica',
        opcode: 0x11,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'je',
        descricao: 'Jump if equal to: muda o endereço do Pc para X caso E = 1',
        opcode: 0x12,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'jne',
        descricao: 'Jump if not equal to: Muda o endereço do PC para x caso E = 0',
        opcode: 0x13,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'jl',
        descricao: 'Jump if lower than: Muda o endereço do PC para X caso L = 1',
        opcode: 0x14,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'jle',
        descricao: 'Muda o valor de PC para X caso E = 1 ou L = 1',
        opcode: 0x15,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'jg',
        descricao: 'Jump if greater than; Muda o valor de PC para X caso G = 1',
        opcode: 0x16,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'jge',
        descricao: 'Muda o valor de PC para X caso G = 1 ou E = 1',
        opcode: 0x17,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'jmp',
        descricao: 'JUMP Muda o PC para o endereço de memoria X',
        opcode: 0x18,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'ld',
        descricao: 'carrega para o registrador X uma palavra da memória de 32 bits que se inicia no endereço Y',
        opcode: 0x19,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'st',
        descricao: 'armazena uma palavra de 32 bits que começa a partir do endereço de memória Y o conteúdo do registrador X',
        opcode: 0x20,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'movi',
        descricao: 'O registrador informado recebe o imediato',
        opcode: 0x21,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'addi',
        descricao: 'O registrador informado recebe o imediato',
        opcode: 0x22,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'subi',
        descricao: 'O registrador informado e subtraido pelo imediato',
        opcode: 0x23,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'muli',
        descricao: 'O registrador informado e multiplicado pelo imediato',
        opcode: 0x24,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'divi',
        descricao: 'O registrador informado e dividido pelo imediato',
        opcode: 0x25,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'lsh',
        descricao: 'desloca a palavra no registrador X em IMM bits à esquerda',
        opcode: 0x26,
        execute: (processador: Processador) => {
            
        }
    },
    {
        nome: 'rsh',
        descricao: 'desloca a palavra no registrador X em IMM bits à direita',
        opcode: 0x27,
        execute: (processador: Processador) => {
            
        }
    }
]