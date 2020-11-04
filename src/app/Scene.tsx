import * as React from "react";
import { Scene } from "../types/Play";
import Speech from "./Speech";

interface Props {
  getPersonLabel: (speaker: string) => string;
  ident: string;
  scene: Scene;
}

const throttler = (
  callback: (event_target: HTMLElement) => void,
  interval: number
) => {
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
};

interface HighlightLineProps {
  getPersonLabel: (speaker: string) => string;
  ident: string;
  scene: Scene;
  scroll_position_map: number[];
}

const HighLightLine: React.FC<HighlightLineProps> = (props) => {
  const [line, setLine] = React.useState<number>(1);
  const div_ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    console.log(`trying to scroll to top: ${div_ref.current}`);
    div_ref.current.scroll(0, 0);
  }, [props.scene]);
  console.log(`HighLightLine.render() ${line}`);
  const onScroll = throttler((event_target: HTMLElement) => {
    // console.log(`onScroll: position ${event_target.scrollTop}`);
    setLine(findNearestLine(event_target.scrollTop + 150));
  }, 250);
  const findNearestLine = (scroll_position: number) => {
    const nearest_line = props.scroll_position_map.reduce(
      (prev, curr, index) => {
        return curr < scroll_position ? index : prev;
      },
      1
    );
    console.log(
      `findNearestLine(${scroll_position}) => ${nearest_line} (of ${props.scroll_position_map.length} entries)`
    );
    return nearest_line;
  };
  return (
    <div className="scene" ref={div_ref} onScroll={onScroll}>
      <p>{props.scene.direction}</p>
      <div>
        {props.scene.content.map((content, index) => (
          <Speech
            content={content}
            getPersonLabel={props.getPersonLabel}
            ident={`${props.ident}.${index}`}
            key={index}
            scroll_position_map={props.scroll_position_map}
            selected_line={line}
          />
        ))}
      </div>
    </div>
  );
};

const ShowScene: React.FC<Props> = (props) => {
  const scroll_position_map: number[] = [];
  console.log(`ShowScene.render() ${scroll_position_map.length}`);
  return (
    <div>
      <HighLightLine
        scroll_position_map={scroll_position_map}
        getPersonLabel={props.getPersonLabel}
        ident={props.ident}
        scene={props.scene}
      />
    </div>
  );
};

export default ShowScene;
