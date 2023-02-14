import _render from "packages/render";
import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { WheelShadow } from "./WheelShadow";
import { PegGroup } from "./PegGroup";
import { WheelSliceGroup } from "./WheelSliceGroup";
import { WheelTextGroup } from "./WheelTextGroup";

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
  sliceCount: number;
  pegs: Matter.Body[];
}

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
      }}
    >
      <circle
        className="wheel__background"
        fill="grey"
        stroke="black"
        cx={props.center.x}
        cy={props.center.y}
        r={props.radius}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center center",
        }}
      />
      <WheelSliceGroup
        className="wheel__slices"
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

      <WheelTextGroup
        className="wheel__slices-text"
        sliceCount={props.sliceCount}
        wheelCenter={props.center}
        wheelRadius={props.radius}
      />
    </g>
  </fragment>
);
