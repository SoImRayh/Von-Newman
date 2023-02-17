import Processador from "@/app/domain/modulos/processador/Processador";
import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { ClockTime } from "@/app/domain/Clocks";
import {Link} from "react-router-dom";

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
      <div>
        <div>
          <h1> Simulador da Máquina de Von Neumman</h1>
        </div>
        <div>
          <Link to={'/compilador'}>Compilador</Link>
          <Link to={'/maquina'}>VM</Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
