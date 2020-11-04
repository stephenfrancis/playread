import * as React from "react";

interface Props {
  line_number: number;
  scroll_position_map: number[];
  selected_line: boolean;
  text: string;
}

const Line: React.FC<Props> = (props) => {
  const marker_class = props.selected_line ? "current_line" : "";
  const refn = React.useCallback((node) => {
    if (node !== null) {
      // console.log(`setting line ${line} scroll position: ${node.offsetTop}`);
      props.scroll_position_map[props.line_number] = node.offsetTop;
    }
  }, []);
  return (
    <span ref={refn} className={marker_class}>
      {props.text}
      <br />
    </span>
  );
};

export default Line;
