
import { NavigationButton } from "@components/buttons/NavigationButton";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { useState } from "react";
import Processador from "@/app/domain/modulos/processador/Processador";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";



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
    <NavigationButton path={'/home'} text={'HOME'}/>
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
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid b
                    order-neutral-300 dark:border-neutral-600 bg-clip-padding py-[0.32rem] px-3 text-xs font-normal
                    text-neutral-700 dark:text-neutral-200 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem]
                    file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit
                    file:bg-neutral-100 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100
                    file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px]
                    hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
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
                  className={''}
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
