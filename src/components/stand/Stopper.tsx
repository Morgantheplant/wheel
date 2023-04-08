import _render from "packages/render";
import { STOPPER } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { SvgBackground } from "../SvgBackground";

const stopperSelector = findBodyById(STOPPER);

const toPoints = (values: Array<number[]>) =>
  values.map((item: number[]) => item.join(" ")).join(",");

const createStopperTrianglePoints = (stopper: Matter.Body) => {
  const width = stopper.plugin.initialWidth; // todo: fix this it is switched
  const height = stopper.plugin.initialHeight;
  const x = 0; //stopper.position.x - width / 2;
  const y = 0; //stopper.position.y - height / 2;
  // end of stopper padding so collision doesnt appear to overlap
  const paddingBottom = 5;
  const topLeft = [x, y];
  const bottom = [x + width / 2, y + height - paddingBottom];
  const topRight = [x + width, y];
  return { points: toPoints([topLeft, bottom, topRight]) };
};
const stopperTransform = (body: Matter.Body) => ({
  style: {
    position: "absolute",
    top: `${body.plugin.initialYPosition - body.plugin.initialHeight/2 + 5}px `,
    left: `${body.plugin.initialXPosition - body.plugin.initialWidth / 2}px`,
    overflow: 'hidden',
    height: `${body.plugin.initialHeight}px`,
    width: `${body.plugin.initialWidth}px`,
    transform: `rotate(${body.angle}rad)`,
    transformOrigin: "4px 20px",
  },
});

export const Stopper = () => {
  return (
    <div
      className="stand__stopper"
      selector={stopperSelector}
      connect={stopperTransform}
    >
      <svg>
        <polygon
          selector={stopperSelector}
          connect={createStopperTrianglePoints}
          fill="orange"
          filter="drop-shadow(1px 1px 1px rgb(0 0 0))"
          stroke="orange"
          style={{
            strokeLinejoin: "round",
            strokeWidth: "3px",
            transformBox: "fill-box",
          }}
        />
      </svg>
    </div>
  );
};
