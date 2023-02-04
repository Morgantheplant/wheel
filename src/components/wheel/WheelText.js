import { selectPeg } from "../../contants/bodies";
import _render from "../../render";
import { findBodyById } from "../../selectors/findBodyById";
import { WHEEL_RADIUS } from "../../settings";


const getXYCoords = (angle, radius, offset) => ({
    x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
    y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
  });


export const WheelText = (props, children) => {
    const angle = props.index * (360 / props.total)
    const {x, y} = getXYCoords(angle, WHEEL_RADIUS, 50)
    
    return <fragment>
        {/* <rect height={2} fill="green" width={WHEEL_RADIUS/2} x={props.centerX-x} y={props.centerY - y}
        style={{
            "transform": `rotate(${270 - angle}deg)`,
            // "transform-origin": "center center",
            "transform-box": "fill-box",
          }}
        ></rect> */}
        <text 
        x={props.centerX - x} // todo: grab center of board
        y={props.centerY - y}
        text-anchor="middle"
        style={{

            "transform": `rotate(${270 - angle}deg)`,
             "transform-origin": "center center",
            "transform-box": "fill-box",
          }}
        >
        {children}
        </text>
        </fragment>
} 