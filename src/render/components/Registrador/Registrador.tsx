import { Instruction } from "@/app/domain/interfaces/Instruction";
import { useState } from "react";

interface RegistradorProps{
  nome: string
  value: number
  detailColor?: string
}

export function Registrador(props : RegistradorProps){


  let tam: string= 'w-52';
  let detailColor: string = 'w-14 rounded-r text-center ';


  props.detailColor?
    detailColor =  detailColor.concat(props.detailColor) : detailColor =  detailColor.concat('bg-secondary')

  return (
  <div className={'tooltip'} data-tip={''}>
    <div className={'flex flex-row g-gray-500b rounded-r border '+ tam}>
      <div className={detailColor}>
        {props.nome}
      </div>
      <div className={'px-4'}>
        0x{props.value.toString(16)}
      </div>
    </div>
  </div>
  );
}
