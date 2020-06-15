
import * as React from "react";
import { Content, ContentSpeech } from "../types/Play";

interface Props {
  content: Content;
  getPersonLabel: (speaker: string) => string;
}

const Speech: React.SFC<Props> = (props) => {
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
  return (
    <div>
      {Speaker((props.content as ContentSpeech).speaker)}
      <p>{props.content.text.map((text, index) => (<span key={index}>{text}<br /></span>))}</p>
    </div>
  );
}

export default Speech;
