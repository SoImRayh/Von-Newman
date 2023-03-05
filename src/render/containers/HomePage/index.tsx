import Processador from "@/app/domain/modulos/processador/Processador";
import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { ClockTime } from "@/app/domain/Clocks";
import {Link} from "react-router-dom";

const HomePage = () => {

  /*
  * TODO embelezar a tela, por enquanto ainda só funcional
  *  */
  return (
    <>
      <div
        className={'bg-zinc-800 min-h-screen text-white font-mono text-2xl flex flex-col justify-center gap-3 text-center' +
          ' px-16'}
      >
        <div className={''}>
          <h1 className={'border border-white'}> Simulador da Máquina de Von Neumman</h1>
        </div>
        <div
          className={'grid grid-cols-2'}
        >
          <Link to={'/compilador'}
                className={'border border-white px-4 p-2 rounded-md' +
                  ' hover:bg-white hover:text-zinc-800'}>
            Compilador
          </Link>
          <Link to={'/maquina'}
                className={'border border-white px-4 p-2 rounded-md' +
                  ' hover:bg-white hover:text-zinc-800'}>
            VM
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
