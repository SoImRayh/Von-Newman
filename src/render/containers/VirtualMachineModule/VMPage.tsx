import Processador from "@/app/domain/modulos/processador/Processador";

import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { NavigationButton } from "@components/buttons/NavigationButton";
import { MemCell } from "@components/memCell/MemCell";
import { BrowserWindow } from "electron"




export function VMPage(){

  /*
  * react rooks
  * */

  const [ciclo, setCiclo] = useState<number>(0);
  const [processador, setprocessador] = useState<Processador>(new Processador());
  const [debug, setDebug] = useState<boolean>(false)


  /*
  * Quando clicar em start é iniciado um timer que vai a cada ciclo de clock incrementar o numero do cliclo de clock
  * que é usado como flag para alterar os valores dos registradores no processador
  * */
    async function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
    /*
    * variáveis
    * */
      let flag : boolean = true
    if(debug === false){
        while (flag){
          await processador.busca()
          await processador.decodifica()
          await processador.executa()
          setCiclo(prev => prev+1)
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


  function createNewWindow(e: React.MouseEvent<HTMLButtonElement>) {
  }

  //====================================================================================================================
  return (
    <div className={'bg-zinc-800 min-h-screen'}>
      <NavigationButton path={'/'} text={'Home'}/>
      <NavigationButton path={'/compilador'} text={'compilador'}/>
      <button onClick={(e) => handleStart(e)} className={'w-20 h-20 bg-green-500 hover:bg-green-600'}>
        start
      </button>
      <button onClick={(e)=> handleReiniciar(e)}>
        reiniciar
      </button>
      <button onClick={(e)=> createNewWindow(e)}>
        nova janela
      </button>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onChange={e => handleStatus(e)} />
        <div
          className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">debug</span>
      </label>
      <div>
        <span className={'text-white font-mono text-lg'}>
          estamos no ciclo de máquina: {ciclo}
        </span>
      </div>
      <div>
        <Registrador nome={"MBR"} value={processador.MBR}/>
      </div>
      <div className={'flex'}>
        <Registrador nome={"PC"} value={processador.PC} />
        <Registrador nome={"IR"} value={processador.IR ? processador.IR.opcode : 0} />
        <Registrador nome={"MAR"} value={processador.MAR} />
        <Registrador nome={"IMM"} value={processador.IMM} />
        <Registrador nome={"RO0"} value={processador.RO0} />
        <Registrador nome={"RO1"} value={processador.RO1} />
      </div>
      <div className={'flex'}>
        <Registrador nome={"L"} value={processador.L} />
        <Registrador nome={"E"} value={processador.E} />
        <Registrador nome={"G"} value={processador.G} />
      </div>
      <div className={'flex'}>
        {processador.GPR.map((reg, index) =>
          <Registrador nome={"R" + index.toString()} value={reg} key={index}/>)
        }
      </div>
      <div className={'grid grid-cols-8'}>
        {
         processador.ram.asArray.map((valor, index) => <MemCell value={valor} key={index}/>)
        }
      </div>

    </div>
  );
}
