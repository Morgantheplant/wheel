import _render from "packages/render";
import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { PegGroup } from "./PegGroup";
import { WheelSliceGroup } from "./WheelSliceGroup";
import { WheelTextGroup } from "./WheelTextGroup";
import { WheelSlice } from "src/store/wheelSlice";
import { SvgBackground } from "../SvgBackground";

const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);

const wheelGroupTransform = (body: Matter.Body) => ({
  style: {
    position: "absolute",
    top: `${body.plugin.initialYPosition - body.plugin.initialRadius}px`,
    left: `${body.plugin.initialXPosition - body.plugin.initialRadius}px`,
    height: `${body.plugin.initialRadius * 2}px`,
    width: `${body.plugin.initialRadius * 2}px`,
    borderRadius: "50%",
    transform: `rotate(${body.angle}rad)`,
    transformOrigin: "center",
    overflow: "hidden",
  },
});

type WheelProps = {
  height: number;
  width: number;
  center: { x: number; y: number };
  radius: number;
  slices?: WheelSlice[];
  sliceCount: number;
  pegs: Matter.Body[];
};

export const Wheel = (props: WheelProps) => (
  <fragment>
    <div connect={wheelGroupTransform} selector={wheelSelector}>
      <SvgBackground width={props.radius * 2} height={props.radius * 2}>
        <circle
          className="wheel__background"
          fill="rgba(196, 228, 245, 0.5)"
          stroke="black"
          cx={props.radius}
          cy={props.radius}
          r={props.radius}
          style={{
            strokeWidth: "5px",
            transformBox: "fill-box",
            transformOrigin: "center center",
          }}
        />
        <image
          href="static/spiral.png"
          height="100px"
          width="100px"
          x={props.radius - 50}
          y={props.radius - 50}
        />
        <circle
          className="wheel__center"
          fill="grey"
          stroke="black"
          r={5}
          cx={props.radius}
          cy={props.radius}
          style={{
            strokeWidth: "2px",
            transformBox: "fill-box",
            transformOrigin: "center center",
          }}
        />
        <WheelSliceGroup
          className="wheel__slices"
          slices={props.slices || []}
          wheelCenter={{ x: props.radius, y: props.radius }}
          wheelRadius={props.radius}
        />
        <PegGroup
          className="wheel__pegs"
          pegs={props.pegs}
          wheelRadius={props.radius}
          width={props.width}
        />
      </SvgBackground>
      <WheelTextGroup
        className="wheel__slices-text"
        slices={props.slices}
        sliceCount={props.sliceCount}
        wheelCenter={{ x: props.radius, y: props.radius }}
        wheelRadius={props.radius}
      />
    </div>
  </fragment>
);
