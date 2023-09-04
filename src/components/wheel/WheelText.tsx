import _render from "packages/render";
import { Children } from "packages/render/types";
import { WheelSlice } from "src/store/wheelSlice";
import { toPx } from "src/utils/toPx";

const getXYCoords = (angle: number, radius: number) => ({
  x: radius * Math.sin((Math.PI * 2 * angle) / 360),
  y: radius * Math.cos((Math.PI * 2 * angle) / 360),
});

export const WheelText = (props: {
  wheelCenter: { x: number; y: number };
  totalSlices: number;
  wheelRadius: number;
  index: number;
  children: Children;
}) => {
  const angle = 360 - props.index * (360 / props.totalSlices);
  const { x, y } = getXYCoords(angle, props.wheelRadius / 2);
  const height = 30;
  const width = props.wheelRadius;
  return (
    <div
      style={{
        position: "absolute",
        color: "black",
        fontWeight: "bold",
        fontFamily: "'Alfa Slab One', verdana",
        fontSize: "calc(0.7rem + 0.7vw)",

        top: toPx(props.wheelRadius - (height / 2) - y),
        left: toPx((width / 2) - x),
        transform: `rotate(${270 - angle}deg) translateX(30px)`,
        transformOrigin: "center",
        WebkitTextStrokeColor: "white",
        WebkitTextStrokeWidth: "1px",
        textAlign: "center",
        height: toPx(height),
        width: toPx(width),
      }}
      selector={(state) => state.slices}
      connect={(slices: WheelSlice[]) => ({
        textContent: slices[props.index]?.text || "",
      })}
    />
  );
};
