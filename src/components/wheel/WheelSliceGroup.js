import _render from "_render";
import { WheelSlice } from "./WheelSlice";

export const WheelSliceGroup = (props) => (
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
