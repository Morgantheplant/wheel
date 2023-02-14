import _render from "packages/render";
import { WheelSlice } from "./WheelSlice";

export const WheelSliceGroup = (props: {sliceCount: number, className: string, wheelCenter: {x: number, y: number}, wheelRadius: number}) => (
  <g className={props.className}>
    {Array.from({ length: props.sliceCount }).map((_, i) => {
      return (
        <WheelSlice
          index={i}
          totalSlices={props.sliceCount}
          wheelCenter={props.wheelCenter}
          wheelRadius={props.wheelRadius}
        />
      );
    })}
  </g>
);
