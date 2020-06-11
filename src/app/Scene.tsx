
import * as React from "react";
import { Scene } from "../types/Play";
import Speech from "./Speech";

interface Props {
  scene: Scene;
}

const ShowScene: React.SFC<Props> = (props) => {
  return (
    <div>
      <div>Scene {props.scene.title}</div>
      <p>{props.scene.direction}</p>
      <div>{props.scene.content.map(content => <Speech content={content} />)}</div>
    </div>
  );
}

export default ShowScene;
