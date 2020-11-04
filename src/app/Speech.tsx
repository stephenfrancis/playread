import * as React from "react";
import { Content, ContentSpeech } from "../types/Play";
import Line from "./Line";

interface Props {
  content: Content;
  getPersonLabel: (speaker: string) => string;
  ident: string;
  scroll_position_map: number[];
  selected_line: number;
}

const Speech: React.FC<Props> = (props) => {
  const Speaker = (speaker: string) => {
    if (!speaker) {
      return;
    }
    const label = props.getPersonLabel(speaker);
    if (label) {
      return <a title={label}>{speaker}</a>;
    }
    return <a>{speaker}</a>;
  };

  return (
    <div key={props.ident}>
      {Speaker((props.content as ContentSpeech).speaker)}
      <p>
        {props.content.text.map((text, index) => {
          const line_number: number = props.content.first_line + index;
          const selected_line: boolean = line_number === props.selected_line;
          return (
            <Line
              key={line_number}
              line_number={line_number}
              scroll_position_map={props.scroll_position_map}
              selected_line={selected_line}
              text={text}
            />
          );
        })}
      </p>
    </div>
  );
};

export default Speech;
