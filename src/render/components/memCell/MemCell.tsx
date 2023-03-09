import { valueOf } from "electron-is-dev";

interface MemCellProps {
  value: number
}
export function MemCell(props: MemCellProps) {

  return (
    <>
      <div className={'px-2 py-2 text-white border border-white border-2'}>
        {props.value}
      </div>
    </>
  )
}
