import _render from "_render";

export const Stand = (props) => {
  const distancepastWheelTop = 40;
  const width = 50;
  return (
    <rect
      height={props.height}
      width={width}
      x={props.wheelCenter.x - width / 2}
      y={props.wheelCenter.y - props.wheelRadius - distancepastWheelTop}
      style={{
        "stroke-width": 1,
        "transform-box": "fill-box",
        "transform-origin": "center center",
      }}
    />
  );
};
