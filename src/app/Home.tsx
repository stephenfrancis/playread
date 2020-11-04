import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <div className="home">
      <Link to="/tempest/1/1">The Tempest</Link>
    </div>
  );
};

export default Home;
