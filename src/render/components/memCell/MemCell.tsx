import { valueOf } from "electron-is-dev";

interface MemCellProps {
  value: number
}
export function MemCell(props: MemCellProps) {

  return (
    <>
      <div className={'px-1 py-2 text-white border border-white border-2 hover:bg-gray-500 text-center'}>
        {props.value}
      </div>
    </>
  )
}
