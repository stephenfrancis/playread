
import * as React from "react";
import { Scene } from "../types/Play";
import Speech from "./Speech";

interface Props {
  getPersonLabel: (speaker: string) => string;
  ident: string;
  scene: Scene;
}


const throttler = (callback: (event_target: HTMLElement) => void, interval: number) => {
  let event_target: HTMLElement = null;
  return (event: React.UIEvent) => {
    if (!event_target) {
      event_target = event.target as HTMLElement;
      setTimeout(() => {
        callback(event_target);
        event_target = null;
      }, interval);
    }
  };
}

interface Counter {
  line_number: number;
  scroll_position_map: number[];
}

interface HighlightLineProps {
  counter: Counter;
  getPersonLabel: (speaker: string) => string;
  ident: string;
  scene: Scene;
}

const HighLightLine: React.SFC<HighlightLineProps> = (props) => {
  const [ line, setLine ] = React.useState<number>(1);
  console.log(`HighLightLine.render() ${line}`);
  const onScroll = throttler((event_target: HTMLElement) => {
    // console.log(`onScroll: position ${event_target.scrollTop}`);
    setLine(findNearestLine(event_target.scrollTop + 50));
  }, 250);
  const findNearestLine = (scroll_position: number) => {
    const nearest_line = props.counter.scroll_position_map.reduce((prev, curr, index) => {
      return (curr < scroll_position) ? index : prev;
    }, 1);
    console.log(`findNearestLine(${scroll_position}) => ${nearest_line} (of ${props.counter.scroll_position_map.length} entries)`);
    return nearest_line;
  }
  return (
    <div className="scene" onScroll={onScroll}>
      <p>{props.scene.direction}</p>
      <div>{props.scene.content.map((content, index) => <Speech
        content={content}
        counter={props.counter}
        getPersonLabel={props.getPersonLabel}
        ident={`${props.ident}.${index}`}
        key={index}
        selected_line={line}
      />)}
      </div>
    </div>
  );
}

const ShowScene: React.SFC<Props> = (props) => {
  const counter: Counter = {
    line_number: 1,
    scroll_position_map: [],
  };
  console.log(`ShowScene.render() ${counter.scroll_position_map.length}`);
  return (
    <div>
      <HighLightLine
        counter={counter}
        getPersonLabel={props.getPersonLabel}
        ident={props.ident}
        scene={props.scene}
      />
    </div>
  );
}

export default ShowScene;
