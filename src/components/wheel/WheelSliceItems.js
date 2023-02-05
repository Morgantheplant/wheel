import _render from "../../render";
import { WHEEL_RADIUS } from "../../settings";
import { WheelSlice } from "./WheelSlice";

export const WheelSliceItems = (props) => (
  <fragment>
    {Array.from({ length: props.sliceCount }).map((_, i) => {
      return (
        <WheelSlice
          index={i}
          totalSlices={props.sliceCount}
        //   radius={WHEEL_RADIUS}
        //   // todo: ensure state set from selector on initial render
        //   x={700 / 2}
        //   y={WHEEL_RADIUS + stopperY + 10}
        />
      );
    })}
  </fragment>
);
