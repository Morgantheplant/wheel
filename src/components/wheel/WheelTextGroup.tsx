import _render from "packages/render";
import { WheelSlice } from "src/store/wheelSlice";
import { WheelText } from "./WheelText";

export const WheelTextGroup = (props: {
  wheelRadius: number;
  wheelCenter: { x: number; y: number };
  className?: string;
  slices: WheelSlice[];
}) => {
  return (
 <div className={props.className}>
    {props.slices.map((slice, i) => {
      return (
        <WheelText
          wheelCenter={props.wheelCenter}
          wheelRadius={props.wheelRadius}
          totalSlices={props.slices.length}
          index={i}
        >
          {slice?.text || `$${i + 1}000`}
        </WheelText>
      );
    })}
  </div>
)};
