import _render from "_render";

// todo: move into util
const getXYCoords = (angle, radius, offset) => ({
  x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
  y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
});

const DISTANCE_FROM_EDGE = 80;
const TEXT_CONTAINER_SIZE = 10;

export const WheelText = (props, children) => {
  const angle = props.index * (360 / props.totalSlices);
  const { x, y } = getXYCoords(angle, props.wheelRadius, DISTANCE_FROM_EDGE);
  return (
    <fragment>
      <text
        fill="black"
        stroke="white"
        text-anchor="middle"
        x={props.wheelCenter.x - x}
        y={props.wheelCenter.y - y + TEXT_CONTAINER_SIZE}
        style={{
          "font-weight": "bold",
          transform: `rotate(${270 - angle}deg)`,
          "transform-origin": "center center",
          "transform-box": "fill-box",
          "text-shadow": "1px 1px 1px #000",
          "stroke-weight": "0.5px",
          "font-size": `24px`,
        }}
      >
        {children}
      </text>
    </fragment>
  );
};
