import _render from "_render";
import { getGradientId, WheelSliceGradient } from "./WheelSliceGradient";

const degreesToRadians = (angle) => ((angle - 90) * Math.PI) / 180;
const getPathCoords = (center, radius, angleDegrees) => {
  const angleRadians = degreesToRadians(angleDegrees);
  return {
    x: center.x + radius * Math.cos(angleRadians),
    y: center.y + radius * Math.sin(angleRadians),
  };
};

const slicePath = ({
  startAngle,
  endAngle,
  innerCircleRadius,
  wheelCenter,
  wheelRadius,
}) => {
  const start = getPathCoords(wheelCenter, wheelRadius, endAngle);
  const end = getPathCoords(wheelCenter, wheelRadius, startAngle);
  const start2 = getPathCoords(wheelCenter, innerCircleRadius, endAngle);
  const end2 = getPathCoords(wheelCenter, innerCircleRadius, startAngle);
  const arcPortion = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    ["M", start.x, start.y],
    ["A", wheelRadius, wheelRadius, 0, arcPortion, 0, end.x, end.y],
    ["L", end2.x, end2.y],
    ["A", innerCircleRadius, innerCircleRadius, 0, arcPortion, 1, start2.x, start2.y],
    ["Z"],
  ]
    .map((path) => path.join(" "))
    .join(" ");
};

const INNER_CIRCLE_SIZE = 50;

export const WheelSlice = ({
  stroke,
  index,
  totalSlices,
  wheelCenter,
  wheelRadius,
}) => {
  const angleSize = 360 / totalSlices;
  const startPosition = angleSize / 2; // start slices offset from Pegs
  const startAngle = angleSize * index + startPosition;
  return (
    <fragment>
      <WheelSliceGradient total={totalSlices} index={index} />
      <path
        className="wheel__slice"
        fill={`url(#${getGradientId(index)})`}
        stroke={stroke}
        d={slicePath({
          startAngle,
          endAngle: startAngle + angleSize,
          innerCircleRadius: INNER_CIRCLE_SIZE,
          wheelRadius,
          wheelCenter,
        })}
      />
    </fragment>
  );
};
