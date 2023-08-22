import { Instruction } from "@/app/domain/interfaces/Instruction";
import { useState } from "react";

interface RegistradorProps{
  nome: string
  value: number
  detailColor?: string
}

export function Registrador(props : RegistradorProps){


  let tam: string = props.nome == 'MBR'? 'w-96' :'w-52';
  let detailColor: string = 'w-14 rounded-r text-center ';


  props.detailColor?
    detailColor =  detailColor.concat(props.detailColor) : detailColor =  detailColor.concat('bg-primary')

  return (
  <div className={'tooltip tooltip-top '} data-tip={props.value}>
    <div className={'flex flex-row g-gray-500b rounded-r border text-white '+ tam}>
      <div className={ detailColor }>
        { props.nome }
      </div>
      <div className={'px-2'}>
        { props.value.toString(2) }
      </div>
    </div>
  </div>
  );
}
