import _render from "packages/render";
import { Children } from "packages/render/types";

// todo: move into util
const getXYCoords = (angle: number, radius:number, offset:number) => ({
  x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
  y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
});

const DISTANCE_FROM_EDGE = 80;
const TEXT_CONTAINER_SIZE = 10;

export const WheelText = (props: {wheelCenter: {x: number, y: number}, totalSlices: number, wheelRadius: number, index: number, children: Children}) => {
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
          fontWeight: "bold",
          transform: `rotate(${270 - angle}deg)`,
          transformOrigin: "center center",
          transformBox: "fill-box",
          textShadow: "1px 1px 1px #000",
          // strokeWeight: "0.5px",
          fontSize: `24px`,
        }}
      >
        {props.children}
      </text>
    </fragment>
  );
};
