import Processador from "@/app/domain/modulos/processador/Processador";

import { Registrador } from "@components/Registrador/Registrador";
import React, { useEffect, useState } from "react";
import { MemCell } from "@components/memCell/MemCell";
import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { NavBar } from "@components/navbar/NavBar";
import { MemoriaCache } from "@/app/domain/modulos/memoria_cache/MemoriaCache";
import {
    CacheMapeamentoAssociativo,
    OverwritePolice,
} from "@/app/domain/modulos/memoria_cache/imp/CacheMapeamentoAssociativo";
import { LinhaComponent } from "@components/memoriaCache/LinhaComponent";
import { useSelector } from "react-redux";
import vmProps from "@redux/reducers/globalProps";

export function VMPage() {
    //@ts-ignore
    const config = useSelector((state) => state.globalProps);

    const [ciclo, setCiclo] = useState<number>(0);
    const [processador, setprocessador] = useState<Processador>(
        new Processador(config)
    );
    const [debug, setDebug] = useState<boolean>(false);
    const [compilador, setCompilador] = useState<Compilador>(
        new Compilador(NEWMAN)
    );

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

            setprocessador(processador);
            //todo implmentar modal para dar fim ao programa
            if (processador.IR?.nome == "hlt") {
                console.log("ir htl");
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
    useEffect(() => {
        console.log(config);
    }, []);

    function componente(cache: MemoriaCache) {
        return cache.linhas.map((linha, index) => {
            return (
                <div className={`flex flex-col card`}>
                    <div className=" flex flex-col text-lg text-white bg-primary px-4">
                        <span className="w-full">
                            {index}| tag:{" "}
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
                                            <table className={"table"}>
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
                                        cache| hits: {processador.cache._total_de_hits} misses: {processador.cache._total_de_misses} buscas totais: {processador.cache._total_de_buscas}
                                    </div>
                                    <div className={"overflow-x-auto overflow-y-auto h-[440px] w-full flex gap-2"}>
                                        {componente(processador.cache)}
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
                </div>
            </div>
        </div>
    );
}
