import _render from "_render";
import { STOPPER } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";

const stopperSelector = findBodyById(STOPPER);

const toPoints = (values) => values.map((item) => item.join(" ")).join(",");

const createStopperTrianglePoints = (stopper) => {
  const width = stopper.initialWidth; // todo: fix this it is switched
  const height = stopper.initialHeight;
  const x = stopper.position.x - width / 2;
  const y = stopper.position.y - height / 2;
  // end of stopper padding so collision doesnt appear to overlap
  const paddingBottom = 5;
  const topLeft = [x, y];
  const bottom = [x + width / 2, y + height - paddingBottom];
  const topRight = [x + width, y];
  return toPoints([topLeft, bottom, topRight]);
};
const stopperTransform = (body) => ({
  points: createStopperTrianglePoints(body),
  style: {
    transform: `rotate(${body.angle}rad)`,
  },
});

export const Stopper = () => {
  return (
    <fragment>
      <polygon
        connect={stopperTransform}
        fill="orange"
        filter="drop-shadow(1px 1px 1px rgb(0 0 0))"
        selector={stopperSelector}
        stroke="orange"
        style={{
          "stroke-linejoin": "round",
          "stroke-width": "3px",
          "transform-box": "fill-box",
          "transform-origin": "4px 20px",
        }}
      />
    </fragment>
  );
};
