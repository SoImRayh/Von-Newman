import Processador from "@/app/domain/modulos/processador/Processador";

import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { NavigationButton } from "@components/buttons/NavigationButton";
import { MemCell } from "@components/memCell/MemCell";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import MemRAM from "@/app/domain/modulos/memoria_ram/MemRAM";
import { NavBar } from "@components/navbar/NavBar";





export function VMPage(){

  const proc: Processador = new Processador();
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
    async function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
    /*
    * variáveis
    * */
      let flag = 0
    if(debug == false){
      while(flag == 0){
        await processador.busca()
        await processador.decodifica().then().catch( err =>{
          flag = err
        })
        await processador.executa()
        setCiclo(prev => prev+1)
        setprocessador(processador)
        if (processador.IR?.nome == 'hlt'){
          setDebug(true)
        }
      }
    } else {
      setCiclo(prev => prev+1)
    }
  }



  /*
  * React hook que usar o state ciclo para iniciar um novo ciclo de clock no processador
  * */


  function handleStatus(checked: React.ChangeEvent<HTMLInputElement>) {
    setDebug(!checked.target.checked)
  }

  function handleReiniciar(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setCiclo(0)
    processador.reiniciar()
  }

  //====================================================== AREA DE TESTE =================================================
  const compilador: Compilador = new Compilador(NEWMAN);

  function createNewWindow(e: React.MouseEvent<HTMLButtonElement>) {
  }

  function handleInputchange(event: React.ChangeEvent<HTMLInputElement>) {
    let file : File;
    const files = event.target.files;
    if ( files ){
      file = files[0];
      file.text().then( async (text) =>{
        compilador.codigo_fonte = text;
        await compilador.compilar();
        await ram.carregarPrograma(compilador.bytecode)
        setRam(ram)
        processador.ram = ram
        console.log(processador);
      })
    }
  }

  //====================================================================================================================
  return (

    <div className={'bg-zinc-800 min-h-screen'}>
      <NavBar/>
      <div className={'flex px-3'}>
        <NavigationButton path={'/'} text={'Home'}/>
        <NavigationButton path={'/compilador'} text={'compilador'}/>
      </div>
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
        <button onClick={(e)=> createNewWindow(e)}
                className={'btn btn-primary'}
        >
          carregar programa
        </button>
        <div>
          <label
            htmlFor="inputfile"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          >Escolha o programa</label
          >
          <input type={'file'} className={'file-input w-full max-w-xs'}/>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onChange={e => handleStatus(e)} />
        <input type="checkbox" className={'toggle toggle-primary'} />
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">debug</span>
      </label>
      <div>
        <span className={'countdown font-mono text-6xl'}>
          estamos no ciclo de máquina: { ciclo }
        </span>
      </div>
      <div>
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
          {/*memória*/}
          <div>
          </div>
        </div>
        <div className={'grid grid-cols-8'}>
          {
            ram.asArray.map((valor, index) => <MemCell value={valor} key={index}/>)
          }
        </div>
      </div>
    </div>
  );
}
