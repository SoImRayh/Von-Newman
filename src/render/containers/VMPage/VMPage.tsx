import Processador from "@/app/domain/modulos/processador/Processador";

import { Registrador } from "@components/Registrador/Registrador";
import React, { useEffect, useState } from "react";
import { MemCell } from "@components/memCell/MemCell";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { NavBar } from "@components/navbar/NavBar";
import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import { useSelector } from "react-redux";
import { BsBug, BsFillPlayFill } from "react-icons/bs";
import { AiFillBug, AiOutlineStepForward } from "react-icons/ai";
import { IoReload } from "react-icons/io5";

export function VMPage() {
    //@ts-ignore
    const config = useSelector((state) => state.globalProps);

    const [ciclo, setCiclo] = useState<number>(0);
    const [debug, setDebug] = useState<boolean>(false);
    const [ time, setTime] = useState<number>(0)
    const [ isRunning, setIsRunning] = useState<boolean>(false)
    const [processador, setProcessador] = useState<Processador>(
        new Processador(config)
    );
    const [compilador, setCompilador] = useState<Compilador>(
        new Compilador(NEWMAN)
    );

    async function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
        setProcessador(processador);
        let flag = 0;
        if (debug) {
            await incrementarCiclo();
        } else {
            setIsRunning(true)
            while (flag == 0) {
                flag = await fazerCiclo();
                setProcessador(processador);
                setCiclo((prev) => prev + 1);
            }
        }
    }
    async function incrementarCiclo() {
        await fazerCiclo();
        setCiclo((prev) => prev + 1);
    }
    async function fazerCiclo() {
        return new Promise<number>(async (resolve, reject) => {
            let flag: number = 0;

            await processador.busca();
            await processador
                .decodifica()
                .then()
                .catch((err) => {
                    flag = err;
                });
            await processador.executa();

            setProcessador(processador);
            //todo implmentar modal para dar fim ao programa
            if (processador.IR?.nome == "hlt") {
                setIsRunning(false)
                reject(1);
            }
            resolve(flag);
        });
    }
    async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files) {
            const file = files[0];

            //carregar o texto e colocar no compilador
            compilador.codigo_fonte = await file.text();
            await compilador.compilar();
            await processador.cache.ram.carregarPrograma(compilador.bytecode);
            setProcessador(processador);
        }
    }
    function handleStatus(checked: React.ChangeEvent<HTMLInputElement>) {
        setDebug(checked.target.checked);
    }
    function handleReiniciar(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setCiclo(0);
        setTime(0)
        processador.reiniciar().then();
    }


    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    //====================================================== AREA DE TESTE =================================================
    function ram() {
        let items: JSX.Element[] = [];
        processador.cache.ram.view.forEach((valor, index) => {
            items.push(<MemCell position={index} value={valor} />);
        });
        return items;
    }
    //====================================================================================================================

    function memoria_cache(cache: MemoriaCache) {
        return cache.linhas.map((linha, index) => {
            return (
              <div className={`flex flex-col card text-sm`}>
                  <div className=" flex flex-col text-md text-white bg-primary px-4">
                        <span className="w-full">
                            {index}| tag:{" "}
                        </span>
                      <span>
                          {linha.tag == 0xffffffff ? "NaN" : linha.tag}
                      </span>
                      <span className={"w-full"}>
                            isAltered:{linha.is_Altered ? " yes" : " no"}
                        </span>
                  </div>
                  {linha.bloco.map((num, index) => {
                      return (
                        <div
                          className={`flex p-2 bg-gray-50 text-zinc-800 hover:bg-gray-200`}
                        >
                            <span>{index}| </span>
                            <span className={"flex justify-center w-full"}>
                                    {num}
                            </span>
                        </div>
                      );
                  })}
              </div>
            );
        });
    }


    return (
        <div className={"flex flex-col gap-4 min-h-screen text-white"}>
            <NavBar />
            <div className={"flex gap-4 mt-3"}>
                { debug ? null :
                  (<button
                    onClick={(e) => handleStart(e)}
                    className={"btn btn-primary "}
                  >
                      <BsFillPlayFill className={'fill-white'}/>
                  </button>)
                }
                <button
                    onClick={(e) => handleReiniciar(e)}
                    className={"btn btn-primary"}
                >
                    <IoReload/>
                </button>
                <div className={"flex items-center gap-2 p-2"}>
                    <AiFillBug className={'fill-green-600'}/>
                    <input
                        type="checkbox"
                        className={"toggle toggle-primary"}
                        accept={".vm"}
                        onChange={(e) => handleStatus(e)}
                    />
                    {
                        debug ? (
                          <>
                              <button className={'btn btn-sm'}
                                      onClick={(e) => handleStart(e)}
                              ><AiOutlineStepForward/></button>
                          </>
                        ): null
                    }
                </div>
                <div className={"flex w-full justify-end"}>
                    <input
                        type={"file"}
                        onChange={(event) => handleFile(event)}
                        placeholder={"alos"}
                        className={
                            "file-input file-input-md w-full max-w-xs mr-20"
                        }
                    />
                </div>
            </div>
            <div>
                <span className={"countdown font-mono text-2xl"}>
                    estamos no ciclo de máquina: {ciclo}, tempo: {time}
                </span>
            </div>
            <div>
                <div className="w-full">
                    <div className={""}>
                        <div className={"flex flex-col"}>
                            <div className={"grid grid-cols-2 gap-4 h-[440px]"}>
                                <div className={"flex flex-col gap-2"}>
                                    <div className={"w-full"}>
                                        <Registrador
                                            nome={"MBR"}
                                            value={processador.MBR}
                                        />
                                    </div>
                                    <div className={"grid grid-cols-2"}>
                                        <div
                                            className={
                                                "flex flex-col gap-4 justify-end"
                                            }
                                        >
                                            <Registrador
                                                nome={"PC"}
                                                value={processador.PC}
                                            />
                                            <Registrador
                                                nome={"IR"}
                                                value={
                                                    processador.IR
                                                        ? processador.IR.opcode
                                                        : 0
                                                }
                                            />
                                            <Registrador
                                                nome={"MAR"}
                                                value={processador.MAR}
                                            />
                                            <Registrador
                                                nome={"IMM"}
                                                value={processador.IMM}
                                            />
                                            <Registrador
                                                nome={"RO0"}
                                                value={processador.RO0}
                                            />
                                            <Registrador
                                                nome={"RO1"}
                                                value={processador.RO1}
                                            />
                                            <Registrador
                                                nome={"L"}
                                                value={processador.L}
                                            />
                                            <Registrador
                                                nome={"E"}
                                                value={processador.E}
                                            />

                                            <Registrador
                                                nome={"G"}
                                                value={processador.G}
                                            />
                                        </div>
                                        <div className={"overflow-x-auto h-96"}>
                                            <table className={"table mt-6"}>
                                                <tbody
                                                    className={
                                                        " flex flex-col gap-1"
                                                    }
                                                >
                                                    {processador.GPR.map(
                                                        (reg, index) => (
                                                            <tr>

                                                                    <Registrador
                                                                      nome={
                                                                        "R" +
                                                                        index.toString()
                                                                      }
                                                                      value={reg}
                                                                      key={index}
                                                                    />

                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className={'flex flex-col'}>
                                    <div>
                                        cache| <span className={'text-[#00ff00]'}>hits</span>: {processador.cache._total_de_hits}
                                        <span className={'text-[#ff0000]'}> misses </span>: {processador.cache._total_de_misses}
                                         <span> buscas totais </span>: {processador.cache._total_de_buscas}
                                    </div>
                                    <div className={"overflow-x-auto overflow-y-auto h-[440px] w-full flex gap-2"}>
                                        {memoria_cache(processador.cache)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="collapse mt-12">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Memoria RAM
                    </div>
                    <div className="collapse-content">
                        <div className={"grid grid-cols-12"}>{ram()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
