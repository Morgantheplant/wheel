import _render from "../../render";
import { selectPeg } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { WHEEL_RADIUS } from "../../settings";

const pegSelector = key => findBodyById(selectPeg(key));
const pegTransform = (body = {}) => ({
  r: body.circleRadius,
  cx: body.initialXPosition + 350, //body.position.x,
  cy: body.initialYPosition + WHEEL_RADIUS + 100,//body.position.y,
  fill: "grey",
  stroke: "black",
  filter: "drop-shadow(2px 2px 2px rgb(0 0 0 / 0.5))",
  style: {
    "transform-origin": "center center",
    "transform-box": "fill-box",
    "stroke-width": 1,
  }
});

export const Peg = (props) => (
  <circle
    selector={pegSelector(props.key)} 
    attributeTransform={pegTransform} 
    />
);


