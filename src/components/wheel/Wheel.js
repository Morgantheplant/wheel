import _render from "../../render";
import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { Peg } from "./Peg";
import { WheelSlice } from "./WheelSlice";
import { WHEEL_RADIUS } from "../../settings";
import { WheelText } from "./WheelText";
import { WheelShadow } from "./WheelShadow";
import { PegItems } from "./PegItems";
import { WheelSliceItems } from "./WheelSliceItems";
import { WheelTextItems } from "./WheelTextItems";

const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);
const wheelTransform = (wheel = {}) => {
  return {
    r: wheel.circleRadius,
    cx: wheel.initialX,
    cy: wheel.initialY,
    style: {
      "transform-origin": "center center",
      "transform-box": "fill-box",
    },
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

export const Wheel = (props) => (
  <fragment>
    <WheelShadow className="wheel__shadow"/>
    <g className="wheel__rotation-group" selector={wheelSelector} attributeTransform={wheelGroupTransform}>
      <circle
        className="wheel__background"
        fill="grey"
        stroke="black"
        selector={wheelSelector}
        attributeTransform={wheelTransform}
      />
      <WheelSliceItems sliceCount={props.sliceCount} />
      <PegItems pegCount={props.pegCount} />
     
     <WheelTextItems sliceCount={props.sliceCount}/> 
     </g>
  </fragment>
);
