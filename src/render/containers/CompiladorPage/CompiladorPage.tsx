import { Compilador } from "@/app/domain/modulos/compilador/Compilador";
import { NEWMAN } from "@/app/domain/arquiteturas/Neumann";
import { useState } from "react";
import { NavBar } from "@components/navbar/NavBar";

export function CompiladorPage() {
    /*
     * states
     * */
    const [compilador, setcompilador] = useState(new Compilador(NEWMAN));
    const [text, settext] = useState<string>("");
    const [ flag, setFlag] = useState<number>(0)


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let file: File;
        const files = event.target.files;
        if (files) {
            file = files[0];
            file.text().then(async (text: string) => {
                settext(text);
                compilador.codigo_fonte = text;
                await compilador.compilar();

                setFlag(1)
            });
        }
    }

    return (
        <div className={" min-h-screen text-white"}>
            <NavBar />
            <div>
                <div className={"flex-col"}>
                    <div className={"min-w-full"}>
                        <div>
                            <div className="mb-3 w-96">
                                <label
                                    htmlFor="inputfile"
                                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                >
                                    Escolha o arquivo a compilar
                                </label>
                                <input
                                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                    id="inputfile"
                                    type="file"
                                    accept={".vm"}
                                    onChange={(event) => handleChange(event)}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={"rounded-2xl col-span-2 border-2 border-white px-4 py-3 h-full"}>
                        <div>
                            <h1>Compilação</h1>
                            <div className={"w-full overflow-x-auto"}>
                                <table className={'table w-full'}>
                                    <thead>
                                        <tr>
                                            <td>String</td>
                                            <td>Posição</td>
                                            <td>Valor ( 0b )</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {text.split("\n").map((linha, index) => {
                                        return (
                                          <tr key={index}>
                                              <td>{linha}</td>
                                              {
                                                  compilador.bytecode[index] ?
                                                    (
                                                      <>
                                                          <td>{compilador.bytecode[index].posicao}</td>
                                                          <td>{
                                                              compilador.bytecode[index].valor.toString(2)
                                                          }</td>
                                                      </>
                                                    ): null
                                              }
                                          </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
