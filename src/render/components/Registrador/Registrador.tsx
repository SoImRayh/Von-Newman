import { Instruction } from "@/app/domain/interfaces/Instruction";

interface RegistradorProps{
  nome: string
  value: number
}

export function Registrador(props : RegistradorProps){
  return (
  <div className={'flex flex-row w-40 bg-gray-400'}>
    <div className={'bg-cyan-600 w-20 rounded-r'}>
      {props.nome}
    </div>
    <div>
      {isNaN(props.value) ? 0: props.value}
    </div>
  </div>
  );
}
