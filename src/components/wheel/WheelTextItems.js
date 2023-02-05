import _render from "../../render";
import { WheelText } from "./WheelText";

export const WheelTextItems = (props) => (
  <fragment>
    {Array.from({ length: props.sliceCount }).map((_, i) => {
      // text must go on top
      return (
        <WheelText
          totalSlices={props.sliceCount}
          index={i}
        >{`$${i + 1}000`}
        </WheelText>
      );
    })}
  </fragment>
);
