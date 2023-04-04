import { ClockTime, ramClock } from "@/app/domain/Clocks";
import { Instruction } from "@/app/domain/interfaces/Instruction";
import MemRAM from "@/app/domain/modulos/memoria_ram/MemRAM";
import {NEWMAN} from "@/app/domain/arquiteturas/Neumann";


class MemCache {
}

/*
* A classe processador sera instaciada com todos os registradores com o valor 0
* */
class Processador {
  /*
  * Registradores variados
  */

  /*
  * PC - Program counter - é responsavel por fazer a contagem de qual instrução está sendo executada,
  * Por padrão o registrador pc é sempre iniciado em 0
  * */
  PC: number = 0;


  /*
  * MBR - Memory buffer register – contém a palavra a ser armazenada na memória. Também é o registrador usado
  * para receber uma palavra lida da memória. Todo o tráfego de e para a memória RAM passa pelo MBR
  * */
  MBR: number = 0;


  /*
  * MAR – Memory Address Register – especifica o endereço de memória da palavra a ser lida da ou escrita na memória.
  *  Todo endereço de memória deve ser indicado nesse registrador antes da execução da instrução.
  * */
  MAR: number = 0;


  /*
  * IR – Instruction Register – contém o opcode da instrução a ser executada.
  * O Ir será implementado como uma instãncia de Instruction para conter mais detalhes
  * */
  IR: Instruction | undefined ;


  /*
  * RO0 – Register Operand 0 – contém o endereço do primeiro operando registrador da instrução
  * */
  RO0: number = 0;


  /*
  * RO1 – Register Operand 1 – contém o endereço do segundo operando registrador da instrução.
  * */
  RO1: number = 0;


  /*
  * IMM – Immediate – contém o operando imediato da instrução.
  * */
  IMM: number = 0


  /*
  * E, L e G – registradores internos que armazenam as flags ‘equal to’, ‘lower than’ e ‘greater than’.
  * Cada uma delas contém um bit indicando se o conteúdo do primeiro operando registrador é, ao ser comparado pela instrução cmp,
  * respectivamente 1) igual a, 2) menor do que ou 3) maior do que o conteúdo do segundo operando registrador.
  * */
  /*
  * L = lower than
  * */
  L: number = NaN;
  /*
  * E = euqual to
  * */
  E: number = NaN;
  /*
  * G = greater than
  * */
  G: number = NaN;


  /*
  * GPR registradores de propósito-geral (GPRs) utilizados para manter temporariamente os operandos na ALU.
  * */
  GPR: number[]=[];


  /*
  * Memoria cache do processador
  * */
  cache: MemCache;


  /*
  * Interface com a memória RAM
  * */
  ram: MemRAM;


  inst: Instruction[];

  constructor() {
    //this.cache = new MemCache();
    this.ram = new MemRAM(64);
    this.inst = NEWMAN
    for (let i = 0; i < 32; i++) {
      this.GPR[i] = 0;
    }
  }


  async busca(): Promise<void> {
    return new Promise(resolve => {
      if (this.cache) {
        console.log("tem cache");
        resolve()
      } else {
        setTimeout(() => {
          this.ram.buscar(this.PC).then(palavra => {
            this.MBR = palavra
            resolve()
          })
        }, ClockTime)

      }

    })
  }

  async decodifica(): Promise<number> {
    return new Promise(async (resolve, reject) => {
      const opcode = this.MBR >>> 24;
      const inst: Instruction | undefined = this.inst.find(instruction => instruction.opcode == opcode)
      if (inst){
        this.IR = inst
        await this.IR.decode(this);
        resolve(0)
      }else{

        reject(1);
      }
    })
  }

  async executa(): Promise<void> {
    return new Promise(async resolve => {
      if (this.IR)
        await this.IR.execute(this)
        resolve()
    })
  }

  async reiniciar(): Promise<void>{
    return new Promise( resolve => {
      this.PC = 0
      resolve()
      }
    )
  }
}

export default Processador
