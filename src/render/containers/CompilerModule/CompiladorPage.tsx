
import { NavigationButton } from "@components/buttons/NavigationButton";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { useState } from "react";
import Processador from "@/app/domain/modulos/processador/Processador";
import MemRAM from "@/app/domain/modulos/memoria_ram/MemRAM";



export function CompiladorPage(){

  /*
  * states
  * */
  const [compilador, setcompilador] = useState(new Compilador(NEWMAN))
  const [text, settext] = useState<string>('')
  const [ram, setRam] = useState<MemRAM>(new MemRAM(512*4))
  const [flag, setFlag] = useState<number>(1)

  /*
  * variaveis
  * */
  const processador = new Processador()



    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let file : File;
    const files = event.target.files;
    if ( files){
      file = files[0]
      file.text().then( async (text: string) => {
        compilador.codigo_fonte = text;
        await compilador.compilar()
        await ram.carregarPrograma(compilador.bytecode)

        setFlag(0)
      })
    }
  }



  async function handleWrite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    processador.ram = ram
    let modificador: number = 0
    if (flag === 0 && modificador === 0) {
      while(modificador === 0) {

        await processador.busca()
        ////

        processador.decodifica().then().catch( response => {
          console.log(processador.ram.view32)
          modificador = 1
        })
        if (flag !=0 ){
          console.log(flag)
          break
        }



        await processador.executa()

      }
    }
  }

  return (
  <div className={"bg-gray-500 min-h-screen"}>
    <NavigationButton path={'/home'} text={'HOME'}/>
    <div>
      <div className={'grid grid-cols-2'}>
        <div className={'min-w-full'}>
          pesquise o arquivo a compilar:
            <div>
              <input type="file" accept={'.vm'} id={'inputfile'} onChange={event => handleChange(event)}/>
            </div>
          <div>
              <div>
                <button onClick={e => handleWrite(e)}>salvar</button>
              </div>
          </div>
          <div>
            <div>
              {
                text.split('\n').map( (linha, index) => (<h1 key={index} >{linha}</h1>))
              }
            </div>
            <div>
              {

              }
            </div>
          </div>
        </div>
        <div className={'bg-green-600'}>
          ou escreva o seu código!
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
  );
}
