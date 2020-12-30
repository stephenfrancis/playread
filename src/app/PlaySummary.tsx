import * as React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import * as Types from "../types/Play";

interface Props {
  play: Types.Play;
  play_id: string;
}

const PlaySummary: React.FC<Props> = (props) => {
  console.log(`PlaySummary() ${props.play.title}`);
  return (
    <>
      <Header
        play_id={props.play_id}
        title={props.play.title}
        next_scene={[1, 1]}
      />
      <div className="play_summary">
        <div>
          <div>
            <b>by {props.play.author}</b>
          </div>
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
        <h3>Dramatis Personae</h3>
        <ul>
          {props.play.dramatis_personae.map((part) => {
            return <li key={part}>{part}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default PlaySummary;
