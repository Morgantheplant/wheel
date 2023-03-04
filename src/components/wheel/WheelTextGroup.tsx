import _render from "packages/render";
import { WheelSlice } from "src/store/wheelSlice";
import { WheelText } from "./WheelText";

export const WheelTextGroup = (props: {
  sliceCount: number;
  wheelRadius: number;
  wheelCenter: { x: number; y: number };
  className?: string;
  slices?: WheelSlice[];
}) => {
  const textValues =  props.slices || Array.from({ length: props.sliceCount })
  return (
 <g className={props.className}>
    {textValues.map((slice, i) => {
      return (
        <WheelText
          wheelCenter={props.wheelCenter}
          wheelRadius={props.wheelRadius}
          totalSlices={props.sliceCount}
          index={i}
        >
          {slice?.text || `$${i + 1}000`}
        </WheelText>
      );
    })}
  </g>
)};
