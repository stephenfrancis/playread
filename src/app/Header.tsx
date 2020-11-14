import * as React from "react";
import { Link } from "react-router-dom";
import AngleLeft from "../assets/react/AngleLeft";
import AngleRight from "../assets/react/AngleRight";

interface Props {
  curr_act?: number;
  curr_scene?: number;
  play_id: string;
  next_scene?: [number, number];
  prev_scene?: [number, number];
  title: string;
}

const Header: React.FC<Props> = (props) => {
  const prevScene = () => {
    return (
      <Link
        to={`/${props.play_id}/${props.prev_scene[0]}/${props.prev_scene[1]}`}
      >
        <AngleLeft />
      </Link>
    );
  };
  const currAct = () => {
    return props.curr_act && `Act ${props.curr_act}`;
  };
  const currScene = () => {
    return props.curr_scene && `Scene ${props.curr_scene}`;
  };
  const nextScene = () => {
    return (
      <Link
        to={`/${props.play_id}/${props.next_scene[0]}/${props.next_scene[1]}`}
      >
        <AngleRight />
      </Link>
    );
  };
  return (
    <div className="header">
      <div>
        <Link to={`/${props.play_id}`}>{props.title}</Link>
      </div>
      <div>{props.prev_scene && prevScene()}</div>
      <div>{currAct()}</div>
      <div>{currScene()}</div>
      <div>{props.next_scene && nextScene()}</div>
    </div>
  );
};

export default Header;
