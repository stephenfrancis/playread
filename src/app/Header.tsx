
import * as React from "react";
import { Link } from "react-router-dom";
import AngleLeft  from "../assets/react/AngleLeft";
import AngleRight from "../assets/react/AngleRight";


interface Props {
  curr_act: number;
  curr_scene: number;
  next_scene: [ number, number ];
  prev_scene: [ number, number ];
  title: string;
}

const Header: React.SFC<Props> = (props) => {
  const prevScene = () => {
    return (
      <Link to={`/tempest/${props.prev_scene[0]}/${props.prev_scene[1]}`}>
        <AngleLeft />
      </Link>
    )
  };
  const nextScene = () => {
    return (
      <Link to={`/tempest/${props.next_scene[0]}/${props.next_scene[1]}`}>
        <AngleRight />
      </Link>
    )
  };
  return (
    <div className="header">
      <div>{props.title}</div>
      <div>{props.prev_scene && prevScene()}</div>
      <div>Act {props.curr_act}</div>
      <div>Scene {props.curr_scene}</div>
      <div>{props.next_scene && nextScene()}</div>
    </div>
  );
}

export default Header;
