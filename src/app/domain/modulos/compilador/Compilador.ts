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
      //separando e já fazendo o 'map' separando as linhas com o separador \n
      this.codigo_fonte.split('\n').map( comando => {
        const splited = comando.split(';');

        //se for uma linha de instrução:
        if (splited[1] === 'i'){

          // separando o terceiro campo na instrução
          let instSplited = splited[2].split(' ');
          instSplited =  instSplited.map( string  => string.replace('r', ''))
          const instrucao : Instruction | undefined = this.architetura_alvo.find( inst => inst.nome === instSplited[0])
          if (instrucao){
            this.bytecode.push({
              posicao: this.parseHEX(splited[0]),
              valor: this.doBitWord(instrucao, instSplited)
            })
          }else{
            throw new Error('instrução não encontrada na arquitetura!')
          }
        }
        //se for uma linha de dado:
        else if (splited[1] === 'd'){
          this.bytecode.push({
            posicao: this.parseHEX(splited[0]),
            valor: this.parseHEX(splited[2])
          })
          resolve(0)
        }
        // caso nao seja nem dado nem instrução:
        else{
          reject('nao é nem instrução nem dado')
        }
      })
    })
  }



  private doBitWord(instruction: Instruction, frase: string[]): number {
    let bitWord: number = 0;
    // coloca o opcode da função na palavra
    bitWord = (bitWord | instruction.opcode);
    /*
    * O objeto @Instruction vai ter uma propriedade que descreve a quantidade de operandos, e se possuir,
    * o tamanho de cada um, e usando isso podemos iterar essa quantidade
    * para formar a palavra com X operandos com tamanho Y, desde que o somatório de
    * XY não seja maior que 24 bits
    * */

    for (let i = 0; i < instruction.formato.opr_qtd; i++) {
      bitWord = bitWord << instruction.formato.opr_tam[i];
      bitWord = bitWord | this.parseHEX(frase[i + 1]);
    }

    /*
    * tratamento de como completar a palavra caso ela nao alcance o tamanho
    * */
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
    for (let i = 0; i < x.length; i++){
      ///se for uma letra entre a e f
      if (isNaN(parseInt(x.charAt(i)))){

        //tenta encontrar um valor correspodente em uma tabela chave-valor
        const valor = char2DecTable.find( e => e.char === x.charAt(i));

        if(valor){
          /*
          * se a variavel val for igual a 0x0 (valor em que ela foi declarada) valor em que é esperado na primeira iteração
          * do ciclo de repetição) é feito a operação logica 'ou' / '|' com a correspodencia hexadecimal retornado na procura anterior,
          * caso falso (falso que seja a primeira iteração), será deslocado 4 bits á esquerda e feito a operação lógica 'ou' novamente!
          * */
          val === 0x0? val = val | valor.hex : val = (val << 0x4) | valor.hex
        }else {
          throw new Error('não é uma letra que possa ser convertida para Hexadecial '+ x.charAt(i))
        }
      }
      /*
      * Caso seja um char representando um número apenas se faz a operação lógica 'ou' / '|' com correspodencial inteira,
      * caso falso (não sendo a primeira iteração do ciclo de repetição) é deslocado 0x4 bits á esquerda e só assim é feito a
      * operação logica 'ou' / '|' novamente
      * */
      else {
        val === 0x0 ? val = val | parseInt(x.charAt(i)) : val = (val << 4) | parseInt(x.charAt(i))
      }
    }
    return val
  }
}
