import * as React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <>
      <Header play_id="" title="Playread" />
      <div className="home">
        <Link to="/tempest">The Tempest</Link>
      </div>
    </>
  );
};

export default Home;
