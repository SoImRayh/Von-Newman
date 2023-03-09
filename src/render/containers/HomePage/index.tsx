import Processador from "@/app/domain/modulos/processador/Processador";
import { Registrador } from "@components/Registrador/Registrador";
import { useEffect, useState } from "react";
import { ClockTime } from "@/app/domain/Clocks";
import {Link} from "react-router-dom";

const HomePage = () => {


  /*
  * TODO embelezar a tela, por enquanto ainda só funcional*/
  return (
    <>
      <div className={'flex flex-col gap-3 items-center justify-center min-h-screen'}>
        <div className={''}>
          <h1
            className={'border border-md border-white text-3xl text-white font-mono px-4 py-4 border-4'}
          >
            Emulador da Máquina de Von Neumman
          </h1>
        </div>
        <div className={'grid grid-cols-2 gap-3'}>
          <Link
            to={'/compilador'}
            className={'text-white text-xl font-mono px-4 py-2 border border-md rounded-md text-center ' +
              'hover:bg-white hover:text-zinc-800'}
          >
            Compilador
          </Link>
          <Link
            to={'/maquina'}
            className={'text-white text-xl font-mono px-4 py-2 border border-md rounded-md text-center ' +
              'hover:bg-white hover:text-zinc-800'}
          >
            VM
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
