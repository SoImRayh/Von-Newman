import { Link } from "react-router-dom";

interface NavigationButtonProps{
  path :string
  text : string
}

export function NavigationButton(props : NavigationButtonProps){
  return (

    <Link to={props.path} className={'btn  btn-outline'}>
      {props.text}
    </Link>
  );
}
