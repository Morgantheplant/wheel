import _render from "_render";
import { Peg } from "./Peg";

export const PegGroup = (props) => {
  return (
    <g>
      {props.pegs.map((peg, i) => {
        return (
          <Peg
            center={{
              x: peg.initialXPosition + props.width / 2,
              y: peg.initialYPosition + props.wheelRadius + 100,
            }}
            key={i}
            radius={peg.circleRadius}
          />
        );
      })}
    </g>
  );
};
