import { valueOf } from "electron-is-dev";

interface MemCellProps {
  position: number
  value: number
}
export function MemCell(props: MemCellProps) {

  const datatip:string = '0b'+props.value.toString(2)+ ' &  0d'+ props.value.toString(10)
  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 w-1/2">0x{props.position.toString(16)}</label>
        <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content">
          <div className="card-body">
            <h3 className="card-title">{props.value}</h3>
            <ul>
              <li><span>Binário: {props.value.toString(2)}</span></li>
              <li><span>Hexadecimal: {props.value.toString(16)}</span></li>
              <li><span>Decimal: {props.value.toString(10 )}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
