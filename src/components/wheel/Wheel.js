import _render from "_render";
import { WHEEL_OF_FORTUNE } from "../../contants/bodies";
import { findBodyById } from "../../selectors/findBodyById";
import { WheelShadow } from "./WheelShadow";
import { PegGroup } from "./PegGroup";
import { WheelSliceGroup } from "./WheelSliceGroup";
import { WheelTextGroup } from "./WheelTextGroup";

const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);

const wheelGroupTransform = (body) => ({
  x: body.position.x,
  y: body.position.y,
  style: {
    transform: `rotate(${body.angle}rad)`,
  },
});

export const Wheel = (props) => (
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
        "transform-box": "fill-box",
        "transform-origin": "center center",
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
          "transform-box": "fill-box",
          "transform-origin": "center center",
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
