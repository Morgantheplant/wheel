import _render from "_render";
import { WheelText } from "./WheelText";

export const WheelTextGroup = (props) => (
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
