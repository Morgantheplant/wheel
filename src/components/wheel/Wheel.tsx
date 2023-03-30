import _render from "packages/render";
import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { WheelShadow } from "./WheelShadow";
import { PegGroup } from "./PegGroup";
import { WheelSliceGroup } from "./WheelSliceGroup";
import { WheelTextGroup } from "./WheelTextGroup";
import { WheelSlice } from "src/store/wheelSlice";

const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);

const wheelGroupTransform = (body: Matter.Body) => ({
  x: body.position.x,
  y: body.position.y,
  style: {
    transform: `rotate(${body.angle}rad)`,
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
    <WheelShadow
      className="wheel__shadow"
      center={props.center}
      radius={props.radius}
    />
    <g
      className="wheel__rotation-group"
      connect={wheelGroupTransform}
      selector={wheelSelector}
      style={{
        transformBox: "fill-box",
        transformOrigin: "center center",
        cursor: "grab",
      }}
    >
      <circle
        className="wheel__background"
        fill="rgba(196, 228, 245, 0.5)"
        stroke="black"
        cx={props.center.x}
        cy={props.center.y}
        r={props.radius}
        style={{
          strokeWidth: "5px",
          transformBox: "fill-box",
          transformOrigin: "center center",
        }}
      />
      <image
        x={props.center.x - 50}
        y={props.center.y - 50}
        href="static/spiral.png"
        height="100px"
        width="100px"
      />
      <circle
        className="wheel__center"
        fill="grey"
        stroke="black"
        cx={props.center.x}
        cy={props.center.y}
        r={5}
        style={{
          strokeWidth: "2px",
          transformBox: "fill-box",
          transformOrigin: "center center",
        }}
      />
      <WheelSliceGroup
        className="wheel__slices"
        slices={props.slices || []}
        wheelCenter={props.center}
        wheelRadius={props.radius}
      />
      <WheelTextGroup
        className="wheel__slices-text"
        slices={props.slices}
        sliceCount={props.sliceCount}
        wheelCenter={props.center}
        wheelRadius={props.radius}
      />
      <PegGroup
        className="wheel__pegs"
        pegs={props.pegs}
        wheelRadius={props.radius}
        width={props.width}
      />
    </g>
  </fragment>
);
