import _render from "packages/render";
import { WheelSlice } from "src/store/wheelSlice";
import { WheelSlice as WheelSliceComponent } from "./WheelSlice";

export const WheelSliceGroup = (props: {slices: WheelSlice[], className: string, wheelCenter: {x: number, y: number}, wheelRadius: number}) => (
  <g className={props.className}>
    {props.slices.map((_, i) => {
      return (
        <WheelSliceComponent
          index={i}
          stroke="black"
          data={_}
          totalSlices={props.slices.length}
          wheelCenter={props.wheelCenter}
          wheelRadius={props.wheelRadius}
        />
      );
    })}
  </g>
);
