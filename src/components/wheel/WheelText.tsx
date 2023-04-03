import _render from "packages/render";
import { Children } from "packages/render/types";
import { WheelSlice } from "src/store/wheelSlice";

const getXYCoords = (angle: number, radius: number, offset: number) => ({
  x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
  y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
});

const DISTANCE_FROM_EDGE = 90;
const TEXT_CONTAINER_SIZE = 10;

export const WheelText = (props: {
  wheelCenter: { x: number; y: number };
  totalSlices: number;
  wheelRadius: number;
  index: number;
  children: Children;
}) => {
  const angle = 360 - props.index * (360 / props.totalSlices);
  const { x, y } = getXYCoords(angle, props.wheelRadius, DISTANCE_FROM_EDGE);
  return (
    <fragment>
      <g
        className={`transform-center`}
        style={{
          transform: `rotate(${270 - angle}deg)`,
          transformOrigin: "center center",
          transformBox: "fill-box",
        }}
      >
        <text
          fill="black"
          stroke="white"
          text-anchor="middle"
          x={props.wheelCenter.x - x}
          y={props.wheelCenter.y - y + TEXT_CONTAINER_SIZE}
          style={{
            fontWeight: "bold",
            fontFamily: "'Alfa Slab One', verdana",
            fontSize: `20px`,
          }}
          selector={(state) => state.slices}
          connect={(slices: WheelSlice[]) => ({
            textContent: slices[props.index]?.text || "",
          })}
        />
      </g>
    </fragment>
  );
};
