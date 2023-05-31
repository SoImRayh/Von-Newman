
import { NavigationButton } from "@components/buttons/NavigationButton";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { useState } from "react";
import Processador from "@/app/domain/modulos/processador/Processador";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import { NavBar } from "@components/navbar/NavBar";



export function CompiladorPage(){

  /*
  * states
  * */
  const [compilador, setcompilador] = useState(new Compilador(NEWMAN))
  const [text, settext] = useState<string>('')
  const [ram, setRam] = useState<MemRAM>(new MemRAM(512*4))
  const [flag, setFlag] = useState<number>(1)
  const [processador, setProcessador] = useState<Processador>(new Processador())

  /*
  * variaveis
  * */



    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let file : File;
    const files = event.target.files;
    if ( files){
      file = files[0]
      file.text().then( async (text: string) => {
        settext(text)
        compilador.codigo_fonte = text;
        await compilador.compilar()
        console.log(compilador.bytecode);
        await ram.carregarPrograma(compilador.bytecode)
        processador.ram = ram
        setFlag(0)
      })
    }
  }



  async function handleWrite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()


        await processador.busca()
        ////

        processador.decodifica().then().catch(response => {

        })



        await processador.executa()

    console.log(processador, processador.GPR.map(valor => valor.toString(16)))

      }



  return (
  <div className={" min-h-screen text-white"}>
    <NavBar/>
    <div>
      <div className={'grid grid-cols-2'}>
        <div className={'min-w-full'}>
            <div>
                <div className="mb-3 w-96">
                  <label
                    htmlFor="inputfile"
                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                  >Escolha o arquivo a compilar</label
                  >
                  <input
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    id="inputfile"
                    type="file"
                    accept={'.vm'}
                    onChange={event => handleChange(event)}
                  />
                </div>
              </div>
          <div>
              <div>
                <button onClick={e => handleWrite(e)}
                  className={'btn btn-primary'}
                >
                  salvar
                </button>
              </div>
          </div>
        </div>
        <div className={'rounded-2xl border border-2 border-white px-4 py-3'}>
          <div>
            <div className={''}>
              <h1>Código fonte:</h1>
              <div className={'min-h-[720px] mt-4'}>
                {
                  text.split('\n').map( (linha, index) => (<h1 key={index} >{linha}</h1>))
                }
              </div>
            </div>
            <div>
              {

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
