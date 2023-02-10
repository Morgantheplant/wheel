import _render from "_render";

export const getGradientId = (index) => `slice-gradient-${index}`;

export const WheelSliceGradient = ({ index, total }) => {
  const value = Math.floor((index * 360) / total);
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