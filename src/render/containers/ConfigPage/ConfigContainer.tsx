import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { NavBar } from "@components/navbar/NavBar";
import { CacheTypes } from "@/app/domain/modulos/memoria_cache/CacheTypes";
import { VmProps } from "@/app/domain/modulos/processador/ProcessadorProps";
import { setProps } from "@redux/reducers/globalProps";

interface ConfigContainerProps {

}



export function ConfigContainer(props: ConfigContainerProps) {
    // @ts-ignore
    const config = useSelector(state => state.globalProps)
    const dispatch = useDispatch()

    const [vmProps, setVmProps] = useState<VmProps>(config as VmProps)

    const enums  = Object.values(CacheTypes)


    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(event.target.value)
        setVmProps(prevState => ({...prevState, [event.target.name]: value}))
    }

    function salvar() {
        dispatch(setProps(vmProps))
    }

    function input(props: {name: string, value: any, label? :string, type?: string}){
        return(
            <div className={'flex flex-col'}>
                <label htmlFor={props.name} className={'label'}>
                    <span className={'label-text-alt'}>{props.label? props.label  : null}</span>
                </label>
                <input
                    type={props.type? props.type : 'number'}
                    name={props.name}
                    className={'input input-bordered input-primary w-full max-w-xl'}
                    value={props.value}
                    onChange={(event) => handleInputChange(event)}/>
            </div>
        )
    }
    function cacheForm(){

        if (vmProps.cacheType == CacheTypes.MAPEAMENTO_ASSOCIATIVO){
            return (
              <div className={'flex gap-4'}>
                  {
                      input({
                          name: '_qtd_linhas',
                          value: vmProps._qtd_linhas,
                          type: 'number',
                          label: 'quantidade de linhas'
                      })
                  }
                  {
                      input({
                          name: '_tam_bloco',
                          value: vmProps._tam_bloco,
                          type: 'number',
                          label: 'Tamanho do bloco de cada linha'
                      })
                  }
              </div>
            )
        }else if(vmProps.cacheType == CacheTypes.MAPEAMENTO_ASSOCIATIVO_POR_CONJUNTO){
            return (
              <div>
                  mapeamento associativo por conjunto
              </div>
            )
        }else if(vmProps.cacheType == CacheTypes.MAPEAMENTO_DIRETO){
            return (
              <div className={'flex gap-4'}>
                  {
                      input({
                          name: "_qtd_linhas",
                          value: vmProps._qtd_linhas,
                          label: "Quantidade de linhas",
                          type: 'number'
                      })
                  }
                  {
                      input(
                        {
                            name: "_tam_bloco",
                            value: vmProps._tam_bloco,
                            label: "Tamanho de cada bloco (bytes)",
                            type: 'number'
                        }
                      )
                  }
              </div>
            )
        }

    }

    return (
    <>
        <NavBar/>
        <div>
            <div className={'card w-96 shadow-xl'}>
                {
                    input({
                        name: 'ram_bytesize',
                        value: vmProps.ram_bytesize,
                        label: "Tamanho da memória ram (bytes)",
                        type: "number"
                    })
                }
            </div>
            <div className={'card w-96 shadow-xl'}>
                <span className={'text-lg text-white font-mono'}>Tempo de acesso a memória (ms)</span>
                <div className={'flex gap-4'}>
                    {
                        input({
                            name: "tempo_ram",
                            value: vmProps.tempo_ram,
                            label: "ram",
                            type: "number"
                        })

                    }
                    {
                        input({
                            name: "tempo_cache",
                            value: vmProps.tempo_cache,
                            label: "Cache",
                            type: "number"
                        })
                    }
                </div>
            </div>
            <div className={'mt-4'}>
                <select name="cache_type"
                        id="cache_type"
                        className={'select select-bordered select-primary select-md'}
                        defaultValue={1}
                onChange={event => {
                    const value = event.target.value as unknown as number
                    console.log(value);
                    setVmProps((prevState: any) => ({...prevState, cacheType : value}))
                } }>
                    {
                        enums.map( (val, index) =>
                            index< (enums.length/2) ?
                                (<option value={enums[(enums.length/2)+index]} key={index}>{enums[index]}</option>)
                                :
                                null
                        )
                    }
                </select>
                {cacheForm()}
            </div>


            <button className={'btn btn-primary'}
                onClick={() => salvar()}
            > Salvar</button>
        </div>
    </>
    )
}
