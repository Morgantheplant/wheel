import _render from "../../render";

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
const arcPath = ({ x, y, radius, innerRadius, startAngle, endAngle }) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var start2 = polarToCartesian(x, y, innerRadius, endAngle);
  var end2 = polarToCartesian(x, y, innerRadius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "L",
    end2.x,
    end2.y,
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    start2.x,
    start2.y,
    "Z",
  ].join(" ");
};

export const WheelSlice = ({ fill, stroke, index, totalSlices, ...props }) => {
  const angle = 360 / totalSlices;
  const offset = angle / 2;
  const startAngle = angle * index + offset;
  const endAngle = startAngle + angle;
  return (
    <path
      fill={fill}
      stroke={stroke}
      d={arcPath({ startAngle, endAngle, ...props })}
    />
  );
};
