import { Instruction } from "@/app/domain/interfaces/Instruction";
import { ProgramaCompilado } from "@/app/domain/interfaces/ProgramaCompilado";
import { char2DecTable } from "@/app/domain/utils/Char2Dec";

export class Compilador {
  architetura_alvo: Instruction[];
  codigo_fonte: string ;
  bytecode: ProgramaCompilado[];


  constructor(arquitetura : Instruction[] ) {
    this.architetura_alvo = arquitetura;
    this.bytecode = []
    this.codigo_fonte = ''
  }

  async compilar(){
    return new Promise((resolve, reject) => {
      this.codigo_fonte.split('\n').map( comando => {
        let splited = comando.split(';');
        //linha de dado:
        if (splited[1] === 'd'){          
          this.bytecode.push({
            posicao: this.parseHEX(splited[0]),
            valor: this.parseHEX(splited[2])
          })
            resolve(0)
          }
        //linha de instrução:
        else {
          let instSplited = splited[2].split(' ');
          instSplited =  instSplited.map( string  => string.replace('a', ''))
          const instrucao : Instruction | undefined = this.architetura_alvo.find( inst => inst.nome === instSplited[0])
          if (instrucao){
            this.bytecode.push({
              posicao: this.parseHEX(splited[0]),
              valor: this.doBitWord(instrucao, instSplited)
            })
          }else{
            throw new Error('instrução não encontrada na arquitetura! nome: '+ instSplited[0])
          }
        }
      })
    })
  }

  private doBitWord(instruction: Instruction, frase: string[]): number {
    let bitWord: number = 0;
    bitWord = (bitWord | instruction.opcode);

    for (let i = 0; i < instruction.formato.opr_qtd; i++) {
      bitWord = bitWord << instruction.formato.opr_tam[i];
      bitWord = bitWord | this.parseHEX(frase[i + 1]);
    }

    let acc: number = 0
    instruction.formato.opr_tam.forEach( value => acc += value)
    if (!(acc === 24)) {
      bitWord = bitWord << (24 - acc)
    }
    return bitWord;
  }

  private parseHEX = (x :string): number =>{
    x = x.toLowerCase()
    let val: number = 0x0;
    for (let i = 0; i < x.length ; i++){
      ///se for uma letra entre a e f
      if (isNaN(parseInt(x.charAt(i)))){
        const valor = char2DecTable.find( e => e.char === x.charAt(i));
        if(valor){ 
          val === 0x0? val = val | valor.hex : val = (val << 0x4) | valor.hex
        }else {
          throw new Error('não é uma letra que possa ser convertida para Hexadecial \''+ x.charAt(i) + '\' iteracao: '+i)
        }
      }
      else {
        val === 0x0 ? val = val | parseInt(x.charAt(i)) : val = (val << 4) | parseInt(x.charAt(i))
      }
    }
    return val
  }
}