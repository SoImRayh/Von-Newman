import Processador from "@/app/domain/Processador";
import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { ClockTime } from "@/app/domain/Clocks";

const HomePage = () => {

  /*
  * react rooks
  * */
  const [ciclo, setCiclo] = useState<number>(0);
  const [processador, setprocessador] = useState(new Processador());


  /*
  * Quando clicar em start é iniciado um timer que vai a cada ciclo de clock incrementar o numero do cliclo de clock
  * que é usado como flag para alterar os valores dos registradores no processador
  * */
  function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setInterval(() => {
      setCiclo(prev => prev + 1);
    }, ClockTime * 4);
  }

  /*
  * React hook que usar o state ciclo para iniciar um novo ciclo de clock no processador
  * */
  useEffect(() => {
    processador.busca();
    processador.decodifica();
    processador.executa();
  }, [ciclo]);


  /*
  * TODO embelezar a tela, por enquanto ainda só funcional*/
  return (
    <>
      alo
      <button onClick={(e) => handleStart(e)} className={'w-20 h-20 bg-green-500 hover:bg-green-600'}>
        start
      </button>
      <div>
        {ciclo}
      </div>
      <Registrador nome={"PC"} value={processador.PC} />
      <Registrador nome={"IR"} value={processador.IR ? processador.IR.opcode : 0} />
      <Registrador nome={"MBR"} value={processador.MBR} />
      <Registrador nome={"MAR"} value={processador.MAR} />
      <Registrador nome={"IMM"} value={processador.IMM} />
      <div>
        <Registrador nome={"L"} value={processador.L} />
        <Registrador nome={"E"} value={processador.E} />
        <Registrador nome={"G"} value={processador.G} />
      </div>
      <div>
        {processador.GPR.map((reg, index) =>
          <Registrador nome={"R" + index.toString()} value={reg} />)
        }
      </div>

    </>
  );
};

export default HomePage;
