import { Link } from "react-router-dom";

interface NavigationButtonProps{
  path :string
  text : string
}

export function NavigationButton(props : NavigationButtonProps){
  return (

    <Link to={props.path} className={'border border-2 border-white hover:bg-white text-white hover:text-black px-3 py-2'}>
      {props.text}
    </Link>
  );
}
