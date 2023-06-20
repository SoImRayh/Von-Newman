import Processador from "@/app/domain/modulos/processador/Processador";

import { Registrador } from "@components/Registrador/Registrador";
import React, { useEffect, useState } from "react";
import { MemCell } from "@components/memCell/MemCell";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { MemRAM } from "@/app/domain/modulos/memoria_ram/MemRAM";
import { NavBar } from "@components/navbar/NavBar";
import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import {
    CacheMapeamentoAssociativo,
    OverwritePolice,
} from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";
import { LinhaComponent } from "@components/memoriaCache/LinhaComponent";

export function VMPage() {
    const [ciclo, setCiclo] = useState<number>(0);
    const [processador, setprocessador] = useState<Processador>(
        new Processador()
    );
    const [debug, setDebug] = useState<boolean>(false);
    const [compilador, setCompilador] = useState<Compilador>(
        new Compilador(NEWMAN)
    );
    const [cache, setCache] = useState<MemoriaCache>(
        new CacheMapeamentoAssociativo(4, 4, OverwritePolice.FIFO)
    )

    async function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
        setprocessador(processador);
        let flag = 0;
        if (debug) {
            await incrementarCiclo();
        } else {
            while (flag == 0) {
                flag = await fazerCiclo();
                setprocessador(processador);
                setCiclo((prev) => prev + 1);
                console.log(processador);
            }
        }
    }
    async function incrementarCiclo() {
        await fazerCiclo();
        setCiclo((prev) => prev + 1);
    }
    async function fazerCiclo() {
        return new Promise<number>( async (resolve, reject) =>{
            let flag: number = 0;

            await processador.busca();
            await processador
                .decodifica()
                .then()
                .catch((err) => {
                    flag = err;
                });
            await processador.executa();

            setprocessador(processador);
            //todo implmentar modal para dar fim ao programa
            if (processador.IR?.nome == "hlt") {
                console.log('ir htl');
                reject(1);
            }
            resolve(flag);
        })
    }
    async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (files) {
            const file = files[0];

            //carregar o texto e colocar no compilador
            compilador.codigo_fonte = await file.text();
            await compilador.compilar();
            await processador.cache.ram.carregarPrograma(compilador.bytecode);
            setprocessador(processador);
        }
    }
    function handleStatus(checked: React.ChangeEvent<HTMLInputElement>) {
        setDebug(checked.target.checked);
    }
    function handleReiniciar(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setCiclo(0);
        processador.reiniciar().then();
    }

    //====================================================== AREA DE TESTE =================================================
    const [contador, setContador] = useState<number>(0);

    async function printar(obj: any){
        return new Promise<void>((resolve)=>{
            console.log(obj)
            resolve()
        })
    }
    async function timer(time: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    async function dowork(event: React.MouseEvent<HTMLButtonElement>) {
        return new Promise<void>(async (resolve) => {
            for (let i = 0; i < 256; i++) {
                processador.MBR = i;
                await processador.cache.salvar(i, i);
                await timer(50);
                i % 32 == 0 ? console.log(processador) : null;
                setprocessador(processador);
                setContador((prevState) => ++prevState);
            }
            resolve();
        });
    }

    function componente(cache: MemoriaCache) {
        return cache.linhas.map((linha, index) => {
            return (
                <div className={`flex`}>
                    <div className=" px-2 text-lg text-zinc-800 bg-green-500">
                        {index}| tag: {linha.tag}| isAltered:{" "}
                        {linha.is_Altered ? "yes" : "no"}
                    </div>
                    {linha.bloco.map((num) => {
                        return (
                            <div className={`p-2 bg-gray-50 text-zinc-800`}>
                                <span>{num}</span>
                            </div>
                        );
                    })}
                </div>
            );
        });
    }
    function ram() {
        let items: JSX.Element[] = [];
        processador.cache.ram.view.forEach((valor, index) => {
            items.push(<MemCell position={index} value={valor} />);
        });
        return items;
    }
    //====================================================================================================================
    return (
        <div className={"min-h-screen"}>
            <NavBar />
            <div className={"flex gap-3 mt-3"}>
                <button
                    onClick={(e) => handleStart(e)}
                    className={"btn btn-primary"}
                >
                    start
                </button>
                <button
                    onClick={(e) => handleReiniciar(e)}
                    className={"btn btn-primary"}
                >
                    reiniciar
                </button>
                <div className={"flex items-center"}>
                    <input
                        type="checkbox"
                        className={"toggle toggle-primary"}
                        accept={".vm"}
                        onChange={(e) => handleStatus(e)}
                    />
                    <span className="ml-3 text-sm font-mono font-medium text-gray-900 dark:text-gray-300">
                        debug
                    </span>
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
                    estamos no ciclo de máquina: {ciclo}
                </span>
            </div>
            <div>
                <div>
                    <div>Memoria</div>
                    <div>
                        {cache.linhas.map((linha) => (
                            <LinhaComponent linha={linha} />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="collapse">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Processador
                    </div>
                    <div className="collapse-content">
                        <div className={""}>
                            <div>
                                <div className={"flex"}>
                                    <Registrador
                                        nome={"MBR"}
                                        value={processador.MBR}
                                    />
                                </div>
                                <div className={"flex mt-2"}>
                                    <div className={`grid grid-cols-6 gap-3`}>
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
                                    </div>
                                </div>
                                <div className={`flex`}>
                                    <div className={"grid grid-cols-3"}>
                                        <div className={`m-2`}>
                                            <Registrador
                                                nome={"L"}
                                                value={processador.L}
                                            />
                                        </div>
                                        <div className={`m-2`}>
                                            <Registrador
                                                nome={"E"}
                                                value={processador.E}
                                            />
                                        </div>
                                        <div className={`m-2`}>
                                            <Registrador
                                                nome={"G"}
                                                value={processador.G}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex"}>
                                    <div className={"grid grid-cols-4"}>
                                        {processador.GPR.map((reg, index) => (
                                            <div className={"m-2"}>
                                                <Registrador
                                                    nome={
                                                        "R" + index.toString()
                                                    }
                                                    value={reg}
                                                    key={index}
                                                />
                                            </div>
                                        ))}
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
                        <div className={"grid grid-cols-12"}>{ram()}</div>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={(event) => dowork(event)}
                        >
                            do
                        </button>
                        <span className={`text-lg`}>contador: {contador}</span>
                        {componente(processador.cache)}
                    </div>
                </div>
            </div>
        </div>
    );
}
