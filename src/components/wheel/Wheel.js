import _render from "../../render";
import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { Peg } from "./Peg";
import { WheelSlice } from "./WheelSlice";
import { PEG_COUNT, WHEEL_RADIUS } from "../../settings";

const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);
const wheelTransform = (body = {}) => {
  return {
    r: body.circleRadius,
    cx: body.position.x,
    cy: body.position.y,
    // style: {
    //   transform: `rotate(${body.angle}rad)`,
    //   "transform-origin": "center center",
    //   "transform-box": "fill-box"
    // },
  };
};

const wheelGroupTransform = (body) => ({
  x: body.position.x,
  y: body.position.y,
  style: {
    transform: `rotate(${body.angle}rad)`,
    "transform-origin": "center center",
    "transform-box": "fill-box",
  },
});

const Gradient = (props) => (
  <defs>
    <linearGradient id={props.id} gradientTransform="rotate(90)">
      <stop offset="5%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </linearGradient>
  </defs>
);

const stopperY = 90;
const angle = 360 / PEG_COUNT;
const startAngle = (360 - 1 * angle) / 2;
const endAngle = startAngle + angle;
export const Wheel = (props) => (
  <fragment>
    <Gradient id={"gradient"} />
    <g selector={wheelSelector} attributeTransform={wheelGroupTransform}>
      <circle
        fill="url('#gradient')"
        stroke="red"
        selector={wheelSelector}
        attributeTransform={wheelTransform}
      />
      {Array.from({ length: props.pegCount }).map((_, i) => {
        return (
          <WheelSlice
            stroke="blue"
            selector={wheelSelector}
            attributeTransform={wheelTransform}
            index={i}
            totalSlices={PEG_COUNT}
            innerRadius={20}
            radius={WHEEL_RADIUS}
            // todo: ensure state set from selector on initial render
            x={700 / 2}
            y={WHEEL_RADIUS + stopperY + 10}
          />
        );
      })}
    </g>
    {Array.from({ length: props.pegCount }).map((_, i) => (
      <Peg key={i} />
    ))}
  </fragment>
);
