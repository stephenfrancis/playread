
import * as React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Scene from "./Scene";
import * as Types from "../types/Play";
// import data from "../data/tempest.json";

interface Props {}


const Waiting: React.SFC<{}> = () => {
  return (
    <div>Loading...</div>
  );
}


interface LoadedProps {
  curr_act_num  : number;
  curr_scene_num: number;
  play: Types.Play;
}

const LoadedPlay: React.SFC<LoadedProps> = (props) => {
  const curr_act: Types.Act = props.play.acts[props.curr_act_num - 1];
  const curr_scene: Types.Scene = curr_act.scenes[props.curr_scene_num - 1];
  let prev_scene: [ number, number ] = null;
  let next_scene: [ number, number ] = null;
  if (props.curr_scene_num > 1) {
    prev_scene = [ props.curr_act_num, props.curr_scene_num - 1 ];
  } else if (props.curr_act_num > 1) {
    prev_scene = [ props.curr_act_num - 1, props.play.acts[props.curr_act_num - 2].scenes.length ];
  }
  if (props.curr_scene_num < curr_act.scenes.length) {
    next_scene = [ props.curr_act_num, props.curr_scene_num + 1 ];
  } else if (props.curr_act_num < props.play.acts.length) {
    next_scene = [ props.curr_act_num + 1, 1 ];
  }
  const getPersonLabel = (speaker: string) => {
    const regexp = new RegExp(`^${speaker}, (.*)`);
    return props.play.dramatis_personae.reduce((prev, curr) => {
      return prev || regexp.test(curr) && regexp.exec(curr)[1];
    }, null);
  }

  return (
    <div>
      <Header
        curr_act={props.curr_act_num}
        curr_scene={props.curr_scene_num}
        title={props.play.title}
        prev_scene={prev_scene}
        next_scene={next_scene}
      />
      <Scene
        getPersonLabel={getPersonLabel}
        scene={curr_scene}
      />
    </div>
  );
}

const Play: React.SFC<Props> = () => {
  const params = useParams<{ play: string, act: string, scene: string }>();
  const [ play, setPlay ] = React.useState<Types.Play>(null);
  const curr_act_num  : number = parseInt(params.act  , 10);
  const curr_scene_num: number = parseInt(params.scene, 10);
  fetch(`/${params.play}.json`)
    .then(response => response.json() as Promise<Types.Play>)
    .then((play_data: Types.Play) => {
      setPlay(play_data);
    })
    .catch(error => {
      console.error(error);
    });
  return (
    <div>
      {!play && <Waiting />}
      { play && <LoadedPlay
        curr_act_num={curr_act_num}
        curr_scene_num={curr_scene_num}
        play={play}
      />}
    </div>
  );
}

export default Play;
