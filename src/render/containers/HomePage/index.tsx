import Processador from "@/app/domain/Processador";
import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { ClockTime } from "@/app/domain/Clocks";

const HomePage = () => {

  const [ciclo, setCiclo] = useState<number>(0)
  const [processador, setprocessador] = useState(new Processador())


  function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setInterval(() => {
      setCiclo(prev => prev+1)
      }, ClockTime*4)
  }

  useEffect(() => {
      processador.busca()
      processador.decodifica()
      processador.executa()
  }, [ciclo])



  return (
    <>
      alo
      <button onClick={(e) => handleStart(e)}>
        start
      </button>
      <div>
        {ciclo}
      </div>
      <Registrador nome={'PC'} value={processador.PC}/>
      <Registrador nome={'IR'} value={processador.IR ? processador.IR.opcode : 0}/>
      <Registrador nome={'MBR'} value={processador.MBR}/>
      <Registrador nome={'MAR'} value={processador.MAR}/>
      <Registrador nome={'IMM'} value={processador.IMM}/>
      <div>
        <Registrador nome={'L'} value={processador.L}/>
        <Registrador nome={'E'} value={processador.E}/>
        <Registrador nome={'G'} value={processador.G}/>
      </div>
      <div>
        {processador.GPR.map((reg, index) =>
          <Registrador nome={'R'+index.toString()} value={reg}/>)
        }
      </div>

    </>
  );
};

export default HomePage;
