
import { NavigationButton } from "@components/buttons/NavigationButton";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { useState } from "react";
import Processador from "@/app/domain/modulos/processador/Processador";
import MemRAM from "@/app/domain/modulos/memoria_ram/MemRAM";


export function CompiladorPage() {

  /*
  * states
  * */
  const [compilador, setcompilador] = useState(new Compilador(NEWMAN))
  const [text, settext] = useState<string>('')
  const [ram, setRam] = useState<MemRAM>(new MemRAM(512 * 4))
  const [processador, setProcessador] = useState<Processador>(new Processador())
  const [pc, setPC] = useState(processador.IR)

  /*
  * variaveis
  * */
  //let processador = new Processador()


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let file: File;
    const files = event.target.files;
    if (files) {
      file = files[0]
      file.text().then(async (text: string) => {
        compilador.codigo_fonte = text;


        await compilador.compilar()
        await ram.carregarPrograma(compilador.bytecode)
        await processador.ram.carregarPrograma(compilador.bytecode)
      })
    }
  }


  async function handleWrite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    processador.ram = ram
    console.log(processador)
    let modificador: number = 0
    while(modificador != 1) {
         await processador.busca()
         await processador.decodifica()
         processador.IR?.opcode == 0x00 ? modificador =1 : null
         await processador.executa()

      //console.log(processador)
    }


  }

  async function handleDebug(e: React.MouseEvent<HTMLButtonElement>) {

      await processador.busca()
      await processador.decodifica()
      await processador.executa()
      setPC(processador.IR)

  }

  return (
      <div className={"min-h-screen text-white"}>
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
                  <button onClick={e => handleDebug(e)}>debug</button>
                </div>
              </div>
              <div>
                <div>
                  {
                    text.split('\n').map((linha, index) => (<h1 key={index}>{linha}</h1>))
                  }
                </div>
                <div>
                  {
                    pc
                  }
                </div>
              </div>
            </div>
            <div className={'bg-green-600'}>
              ou escreva o seu código!
              <input type="text"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
