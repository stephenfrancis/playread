
import * as React from "react";
import { Content, ContentSpeech } from "../types/Play";

interface Props {
  content: Content;
}

const Speech: React.SFC<Props> = (props) => {
  return (
    <div>
      {(props.content as ContentSpeech).speaker || ""}
      <p>{props.content.text.map(text => (<span>{text}<br /></span>))}</p>
    </div>
  );
}

export default Speech;
