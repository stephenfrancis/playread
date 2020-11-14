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
    return (
      <a title={label} className="speaker line">
        {speaker}
      </a>
    );
  };

  const selected_speech: boolean =
    props.selected_line >= props.content.first_line &&
    props.selected_line < props.content.first_line + props.content.text.length;
  const speech_class: string =
    "speech" + (selected_speech ? " selected_speech" : "");

  return (
    <div key={props.ident} className={speech_class}>
      {Speaker((props.content as ContentSpeech).speaker)}
      {props.content.text.map((text, index) => {
        const line_number: number = props.content.first_line + index;
        return (
          <Line
            key={line_number}
            line_number={line_number}
            scroll_position_map={props.scroll_position_map}
            text={text}
          />
        );
      })}
    </div>
  );
};

export default Speech;
