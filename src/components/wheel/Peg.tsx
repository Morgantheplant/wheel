import _render from "packages/render";

export const Peg = (props: {
  center: { x: number; y: number };
  radius: number;
}) => (
  <circle
    cx={props.center.x}
    cy={props.center.y}
    fill="grey"
    filter="drop-shadow(3px 5px 2px rgb(0 0 0 / 0.5))"
    r={props.radius}
    stroke="black"
    style={{
      strokeWidth: 1,
      transformBox: "fill-box",
      transformOrigin: "center center",
    }}
  />
);
