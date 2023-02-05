import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import _render from "../../render";
import { findBodyById } from "../../selectors/findBodyById";

const shadowTransform = (wheel) => ({
  className: "shadow",
  r: wheel.initialRadius,
  cx: wheel.initialX + 5,
  cy: wheel.initialY + 8,
  fill: "rgba(0,0,0, 0.4)",
  filter:"url(#blurFilter)"
});

const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);

export const WheelShadow = (props) => (
  <g className={props.className}>
    <filter id="blurFilter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
    </filter>
    <circle
      selector={wheelSelector}
      attributeTransform={shadowTransform}
    />
  </g>
);
