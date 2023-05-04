import Processador from "@/app/domain/modulos/processador/Processador";

import { Registrador } from "@components/Registrador/Registrador";
import { useState } from "react";
import { MemCell } from "@components/memCell/MemCell";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import { NavBar } from "@components/navbar/NavBar";
import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import {
  CacheMapeamentoAssociativo,
  OverwritePolice
} from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";
import { LinhaComponent } from "@components/memoriaCache/LinhaComponent";


export function VMPage(){

  /*
  * react rooks
  * */

  const [ciclo, setCiclo] = useState<number>(0);
  const [processador, setprocessador] = useState<Processador>(new Processador());
  const [ram, setRam] = useState<MemRAM>(new MemRAM(512))
  const [debug, setDebug] = useState<boolean>(false)


  /*
  * Quando clicar em start é iniciado um timer que vai a cada ciclo de clock incrementar o numero do cliclo de clock
  * que é usado como flag para alterar os valores dos registradores no processador
  * */
    async function handleStart(e: React.MouseEvent<HTMLButtonElement>){
      console.log(cache);
      setprocessador(processador)
      let flag = 0
      if(debug == true){
        console.log('debug ativado');
        await incrementarCiclo()
      } else {
        while(flag == 0){
          flag = await fazerCiclo()
          setprocessador(processador)
          setCiclo(prev => prev+1)
          console.log(processador);
        }
      }
    }
  async function incrementarCiclo(){
    await fazerCiclo()
    setCiclo(prev => prev+1)
  }

    async function fazerCiclo(){

        let flag: number=0;

        await processador.busca()

        await processador.decodifica().then().catch( err =>{
          flag = err
        })

        await processador.executa()

        setprocessador(processador)
        if (processador.IR?.nome == 'hlt'){
          return 1
        }
         return flag
    }






  function handleStatus(checked: React.ChangeEvent<HTMLInputElement>) {
    setDebug(checked.target.checked)
  }

  function handleReiniciar(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setCiclo(0)
    processador.reiniciar()
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files){
      const file = files[0]

      //carregar o texto e colocar no compilador
      const text = await file.text()
      compilador.codigo_fonte = text
      await compilador.compilar()

      await ram.carregarPrograma(compilador.bytecode);
      setRam(ram)
      console.log(ram);

      processador.ram = ram
      setprocessador(processador)
    }

  }

  //====================================================== AREA DE TESTE =================================================
  const compilador: Compilador = new Compilador(NEWMAN);

  const [cache, setCache]
    = useState<MemoriaCache>(new CacheMapeamentoAssociativo(4,4,OverwritePolice.FIFO))


  cache.salvar(4,4)
  console.log(cache)







  //====================================================================================================================
  return (

    <div className={'min-h-screen'}>
      <NavBar/>
      <div className={'flex gap-3 mt-3'}>
        <button
          onClick={(e) => handleStart(e)}
          className={'btn btn-primary'}
        >
          start
        </button>
        <button onClick={(e)=> handleReiniciar(e)}
                className={'btn btn-primary'}
        >
          reiniciar
        </button>
        <div className={'flex items-center'}>
          <input type="checkbox" className={'toggle toggle-primary'} accept={'.vm'} onChange={e => handleStatus(e)}/>
          <span className="ml-3 text-sm font-mono font-medium text-gray-900 dark:text-gray-300">debug</span>
        </div>
        <div className={'flex w-full justify-end'}>
          <input type={'file'} onChange={(event) => handleFile(event)} placeholder={'alos'} className={'file-input file-input-md w-full max-w-xs mr-20'}/>
        </div>
      </div>
      <div>
        <span className={'countdown font-mono text-2xl'}>
          estamos no ciclo de máquina: { ciclo }
        </span>
      </div>
      <div>
        <div>
          Memoria
        </div>
        <div>
          {cache.linhas.map(linha => <LinhaComponent linha={linha}/>)}
        </div>
      </div>
      <div>
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Processador
          </div>
          <div className="collapse-content">
            <div className={''}>
              <div>
                <div className={'flex'}>
                  <Registrador nome={"MBR"} value={processador.MBR}/>
                </div>
                <div className={'flex mt-2'}>
                  <div className={`grid grid-cols-6 gap-3`}>
                    <Registrador nome={"PC"} value={processador.PC} />
                    <Registrador nome={"IR"} value={processador.IR ? processador.IR.opcode : 0} />
                    <Registrador nome={"MAR"} value={processador.MAR} />
                    <Registrador nome={"IMM"} value={processador.IMM} />
                    <Registrador nome={"RO0"} value={processador.RO0} />
                    <Registrador nome={"RO1"} value={processador.RO1} />
                  </div>
                </div>
                <div className={`flex`}>
                  <div className={'grid grid-cols-3'}>

                    <div className={`m-2`}>
                      <Registrador nome={"L"} value={processador.L} />
                    </div>
                    <div className={`m-2`}>
                      <Registrador nome={"E"} value={processador.E} />
                    </div>
                    <div className={`m-2`}>
                      <Registrador nome={"G"} value={processador.G} />
                    </div>

                  </div>
                </div>
                <div className={'flex'}>
                  <div className={'grid grid-cols-4'}>
                    {
                      processador.GPR.map((reg, index) =>
                        (
                          <div className={'m-2'}>
                            <Registrador nome={"R" + index.toString()} value={reg} key={index}/>
                          </div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Memoria RAM
          </div>
          <div className="collapse-content">
            <div className={'grid grid-cols-12'}>
              {
                ram.asArray.map((valor, index) => <MemCell value={valor} position={index} key={index}/>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
