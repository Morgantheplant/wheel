import _render from "../../render";
import { wheelSelector } from "../../selectors/wheelSelector";

const getXYCoords = (angle, radius, offset) => ({
  x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
  y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
});

const textTransform = (angle) => (wheel) => {
  const distaceFromEdge = 70;
  const { x, y } = getXYCoords(angle, wheel.initialRadius, distaceFromEdge);
  return {
    x: wheel.initialX - x, // todo: grab center of board
    y: wheel.initialY - y,
  };
};

export const WheelText = (props, children) => {
  const angle = props.index * (360 / props.totalSlices);
  return (
    <fragment>
      <text
        selector={wheelSelector}
        attributeTransform={textTransform(angle)}
        text-anchor="middle"
        style={{
          "font-weight": "bold",
          transform: `rotate(${270 - angle}deg)`,
          "transform-origin": "center center",
          "transform-box": "fill-box",
        }}
      >
        {children}
      </text>
    </fragment>
  );
};
