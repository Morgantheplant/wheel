import _render from "_render";

export const Peg = (props) => (
  <circle
    cx={props.center.x}
    cy={props.center.y}
    fill="grey"
    filter="drop-shadow(3px 5px 2px rgb(0 0 0 / 0.5))"
    r={props.radius}
    stroke="black"
    style={{
      "stroke-width": 1,
      "transform-box": "fill-box",
      "transform-origin": "center center",
    }}
  />
);
