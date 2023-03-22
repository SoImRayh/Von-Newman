import { Instruction } from "@/app/domain/interfaces/Instruction";

interface RegistradorProps{
  nome: string
  value: number
}

export function Registrador(props : RegistradorProps){
  return (
  <div className={'flex flex-row bg-gray-500'}>
    <div className={'bg-cyan-600 px-4 rounded-r'}>
      {props.nome}
    </div>
    <div className={'px-4'}>
      0x{isNaN(props.value) ? 0: props.value}
    </div>
  </div>
  );
}
