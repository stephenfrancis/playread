
import * as React from "react";
import { Scene } from "../types/Play";
import Speech from "./Speech";

interface Props {
  getPersonLabel: (speaker: string) => string;
  scene: Scene;
}

const ShowScene: React.SFC<Props> = (props) => {
  return (
    <div className="scene">
      <p>{props.scene.direction}</p>
      <div>{props.scene.content.map((content, index) => <Speech
          content={content}
          getPersonLabel={props.getPersonLabel}
          key={index}
        />)}</div>
    </div>
  );
}

export default ShowScene;
