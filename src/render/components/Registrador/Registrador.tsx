import { Instruction } from "@/app/domain/interfaces/Instruction";

interface RegistradorProps{
  nome: string
  value: number
  detailColor?: string
}

export function Registrador(props : RegistradorProps){
  let tam: string;
  let detailColor: string = 'w-14 rounded-r text-center ';
  props.detailColor? detailColor =  detailColor.concat(props.detailColor) : detailColor =  detailColor.concat('bg-green-400')
  //props.nome == "MBR"? tam = "w-[500px]": tam = "w-40";
  tam = "w-52"

  return (
  <div className={'flex flex-row bg-gray-500 rounded-r '+ tam}>
    <div className={detailColor}>
      {props.nome}
    </div>
    <div className={'px-4'}>
      0x{isNaN(props.value) ? 0: props.value.toString(16)}
    </div>
  </div>
  );
}
