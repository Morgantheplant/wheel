import _render from "../../render";
import { selectPeg } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";

const pegSelector = key => findBodyById(selectPeg(key));
const pegTransform = (body = {}) => ({
  r: body.circleRadius,
  cx: body.position.x,
  cy: body.position.y,
  fill: "black",
  stroke: "red",
  style: {
    "transform-origin": "center center",
    "transform-box": "fill-box",
  }
});

export const Peg = (props) => (
  <circle 
    id="foo"
    selector={pegSelector(props.key)} 
    attributeTransform={pegTransform} 
    />
);
