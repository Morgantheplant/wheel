import _render from "packages/render";

export const Stand = (props: {
  wheelRadius: number;
  height: number;
  wheelCenter: { x: number; y: number };
}) => {
  const distancepastWheelTop = 40;
  const width = 50;
  return (
    <rect
      className="stand__base"
      height={props.height}
      width={width}
      stroke="grey"
      x={props.wheelCenter.x - width / 2}
      y={props.wheelCenter.y - props.wheelRadius - distancepastWheelTop}
      style={{
        strokeWidth: 1,
        transformBox: "fill-box",
        transformOrigin: "center center",
      }}
    />
  );
};
