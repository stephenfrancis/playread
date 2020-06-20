
import * as React from "react";
import { MemoryRouter, Route, useParams } from "react-router-dom";
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
  play: Types.Play;
}

const LoadedPlay: React.SFC<LoadedProps> = (props) => {
  const params = useParams<{ act: string, scene: string }>();
  const curr_act_num  : number = parseInt(params.act  , 10);
  const curr_scene_num: number = parseInt(params.scene, 10);
  // console.log(`LoadedPlay() ${curr_act_num}/${curr_scene_num}`);
  if (!Number.isFinite(curr_act_num) || !Number.isFinite(curr_scene_num)) {
    throw new Error(`invalid act ${curr_act_num} or scene ${curr_scene_num} number`);
  }
  const curr_act  : Types.Act   = props.play.acts[curr_act_num - 1];
  const curr_scene: Types.Scene = curr_act.scenes[curr_scene_num - 1];
  let prev_scene: [ number, number ] = null;
  let next_scene: [ number, number ] = null;
  if (curr_scene_num > 1) {
    prev_scene = [ curr_act_num, curr_scene_num - 1 ];
  } else if (curr_act_num > 1) {
    prev_scene = [ curr_act_num - 1, props.play.acts[curr_act_num - 2].scenes.length ];
  }
  if (curr_scene_num < curr_act.scenes.length) {
    next_scene = [ curr_act_num, curr_scene_num + 1 ];
  } else if (curr_act_num < props.play.acts.length) {
    next_scene = [ curr_act_num + 1, 1 ];
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
        curr_act  ={curr_act_num}
        curr_scene={curr_scene_num}
        title={props.play.title}
        prev_scene={prev_scene}
        next_scene={next_scene}
      />
      <Scene
        getPersonLabel={getPersonLabel}
        ident={`${curr_act_num}.${curr_scene_num}`}
        scene={curr_scene}
      />
    </div>
  );
}

const Play: React.SFC<Props> = () => {
  const params = useParams<{ play: string }>();
  const [ play, setPlay ] = React.useState<Types.Play>(null);
  if (!params.play) {
    throw new Error(`no play specified`);
  }
  console.log(`Play() ${params.play}`);
  if (!play) {
    fetch(`/${params.play}.json`)
      .then(response => response.json() as Promise<Types.Play>)
      .then((play_data: Types.Play) => {
        setPlay(play_data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <MemoryRouter initialEntries={[ "/1/1" ]}>
      <Route path="/:act/:scene">
    {/* <div> */}
        {!play && <Waiting />}
        { play && <LoadedPlay play={play} />}
    {/* </div> */}
      </Route>
    </MemoryRouter>
  );
}

export default Play;
