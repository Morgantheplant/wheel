import _render from "packages/render";
import { WheelText } from "./WheelText";

export const WheelTextGroup = (props: {sliceCount: number, wheelRadius: number, wheelCenter: {x: number, y: number}, className?: string}) => (
  <g>
    {Array.from({ length: props.sliceCount }).map((_, i) => {
      return (
        <WheelText
          wheelCenter={props.wheelCenter}
          wheelRadius={props.wheelRadius}
          totalSlices={props.sliceCount}
          index={i}
        >{`$${i + 1}000`}
        </WheelText>
      );
    })}
  </g>
);
