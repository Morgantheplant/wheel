import _render from "packages/render";

export const Stand = (props: {
  wheelRadius: number;
  height: number;
  wheelCenter: { x: number; y: number };
}) => {
  const distancepastWheelTop = 40;
  const width = 50;
  return (
    <div
      className="stand__base"
      style={{
        position: 'absolute',
        left: `${props.wheelCenter.x - width / 2}px`,
        top: `${props.wheelCenter.y - props.wheelRadius - distancepastWheelTop}px`,
        border: '1px solid grey',
        width: `${width}px`,
        height: `${props.height}px`,
        backgroundColor: "black"
      }}
    />
  );
};
