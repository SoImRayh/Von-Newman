import { ClockTime, ramClock } from "@/app/domain/Clocks";
import { Instruction } from "@/app/domain/interfaces/Instruction";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import {RISCV} from "@/app/domain/arquiteturas/Risc-V";

class MemCache {
    // Implementar posteriormente
}

class RiscV {

    MBR: number = 0;

    IR: Instruction | undefined ;

    //PC - Program counter

    PC: number = 0;

    // Regustradores de proposito geral X0 = 0 X1 a X31 são acessaveis

    XLEN: number[]=[];

    // IMM registrador imediato

    IMM: number = 0

    //RS1 registrador auxiliar 1

    RS1: number = 0

    //RS2 registrador auxiliar 2

    RS2: number = 0

    //RD registrador de destino

    RD: number = 0

    //L = lower than

    L: number = NaN;

    //E = euqual to

    E: number = NaN;

    //G = greater than

    G: number = NaN;

    //Memoria cache do processador

    cache: MemCache;

    //Interface com a memória RAM

    ram: MemRAM;


    inst: Instruction[];

    constructor() {
        //this.cache = new MemCache();
        this.ram = new MemRAM(128,4);
        this.inst = RISCV
        for (let i = 0; i < 32; i++) {
        this.XLEN[i] = 0;
        }
    }

    async busca(): Promise<void> {
        return new Promise(resolve => {
          if (this.cache) {
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
          const opcode = this.MBR >>> 25;
          const inst: Instruction | undefined = this.inst.find(instruction => instruction.opcode == opcode)
          if (inst &&  inst.nome != 'hlt'){
            this.IR = inst
            await this.IR.decode.then(
              () => resolve(0)
            );
          }else{

            reject(1);
          }
        })
      }

      async executa(): Promise<void> {
        return new Promise(async resolve => {
          if (this.IR)
            { // @ts-ignore
              await this.IR.execute(this)
            }
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

export default RiscV
