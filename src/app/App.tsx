
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Play from "./Play";

interface Props {}


const App: React.SFC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:play">
          <Play />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
