import _render from "../../render"; 
import { wheelSelector } from "../../selectors/wheelSelector";

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

const getGradientId = (index) => `slice-gradient-${index}`;

export const SliceGradient = ({index, total}) => {
  const value = Math.floor(index * 360/total);
  const color1 = `hsl(${value}, 100%, 50%)`;
  const color2 = `hsl(${value + 10}, 90%, 45%)`;
  return (
    <defs>
      <linearGradient id={getGradientId(index)}>
        <stop offset="5%" stop-color={color1} />
        <stop offset="95%" stop-color={color2} />
      </linearGradient>
    </defs>
  );
};

const sliceTransform =(startAngle, endAngle) =>  (wheel) => {
  const x = wheel.initialX
  const y =wheel.initialY
  return {
    d: arcPath({ 
      x,
      y,
      startAngle, 
      endAngle, 
      innerRadius: 20, 
      radius: wheel.initialRadius,
      innerRadius: 10
    })
  }
}

export const WheelSlice = ({ fill, stroke, index, totalSlices, ...props }) => {
  const angle = 360 / totalSlices;
  const offset = angle / 2;
  const startAngle = angle * index + offset;
  const endAngle = startAngle + angle;
  return (
    <fragment>
      <SliceGradient total={totalSlices} index={index} />
      <path
        fill={`url(#${getGradientId(index)})`}
        stroke={stroke || "black"}
        selector={wheelSelector}
        attributeTransform={sliceTransform(startAngle, endAngle)}
      />
     
    </fragment>
  );
};
