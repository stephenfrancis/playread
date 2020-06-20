
import * as React from "react";
import { Content, ContentSpeech } from "../types/Play";

interface Props {
  content: Content;
  counter: { line_number: number, scroll_position_map: number[] };
  getPersonLabel: (speaker: string) => string;
  ident: string;
  selected_line: number;
}

const Speech: React.SFC<Props> = (props) => {
  let line_number = props.content.first_line;
  const Speaker = (speaker: string) => {
    if (!speaker) {
      return;
    }
    const label = props.getPersonLabel(speaker);
    if (label) {
      return (
        <a title={label}>{speaker}</a>
      );
    }
    return (
      <a>{speaker}</a>
    );
  };
  const Line = (text, index) => {
    const line = line_number++;
    const marker_class = (line === props.selected_line) ? "current_line" : "";
    const refn = React.useCallback(node => {
      if (node !== null) {
        // console.log(`setting line ${line} scroll position: ${node.offsetTop}`);
        props.counter.scroll_position_map[line] = node.offsetTop;
      }
    }, []);
    return (
      <span key={line} ref={refn} className={marker_class}>
        {text}
        <br />
      </span>
    );
  };
  return (
    <div>
      {Speaker((props.content as ContentSpeech).speaker)}
      <p>{props.content.text.map(Line)}</p>
    </div>
  );
}

export default Speech;
