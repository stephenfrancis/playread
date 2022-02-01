import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Play from "./Play";

import "../public/main.css";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:play_id/*" element={<Play />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
