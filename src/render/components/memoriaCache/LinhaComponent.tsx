import { Linha } from "@/app/domain/modulos/memoria_cache/imp/types/Linha";

interface LinhaProps {
    linha: Linha
}

export function LinhaComponent(props: LinhaProps) {

  function li(val: number) {
    return (
      <>
        { val.toString(2) }
      </>
    )
  }
    return (
    <>
      <div>
        <ul>
          {props.linha.bloco.map(num => {
            li(num)
          })}
        </ul>
      </div>

    </>
    )
}
