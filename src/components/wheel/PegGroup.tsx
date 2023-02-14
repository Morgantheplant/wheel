import _render from "packages/render";
import { Peg } from "./Peg";

export const PegGroup = (props: { width: number, wheelRadius: number, pegs: Matter.Body[], className?: string }) => {
  return (
    <g>
      {props.pegs.map((peg: Matter.Body, i) => {
        return (
          <Peg
            center={{
              x: peg.plugin.initialXPosition + props.width / 2,
              y: peg.plugin.initialYPosition + props.wheelRadius + 100,
            }}
            key={i}
            radius={peg.circleRadius as number} // todo: type Pegs
          />
        );
      })}
    </g>
  );
};
