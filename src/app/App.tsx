
import * as React from "react";
import * as ReactDOM from "react-dom";
import data from "../data/tempest.json";
import Scene from "./Scene";

interface Props {}


const App: React.SFC<Props> = (props) => {
  return (
    <div>
      <Scene scene={data.acts[0].scenes[0]} />
    </div>
  );
}

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
