import * as React from "react";

interface Props {
  line_number: number;
  scroll_position_map: number[];
  text: string;
}

const Line: React.FC<Props> = (props) => {
  const refn = React.useCallback((node) => {
    if (node !== null) {
      props.scroll_position_map[props.line_number] = node.offsetTop;
    }
  }, []);
  return <div ref={refn}>{props.text}</div>;
};

export default Line;
