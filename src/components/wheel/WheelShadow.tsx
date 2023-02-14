import _render from "packages/render";


export const WheelShadow = (props: {center: {x: number, y: number}, className?: string, radius: number}) => (
  <g className={props.className}>
    <filter id="blurFilter">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
    </filter>
    <circle
      className="wheel__shadow"
      cx={props.center.x + 5}
      cy={props.center.y + 8}
      r={props.radius}
      style={{
        fill: "rgba(0,0,0, 0.4)",
        filter: "url(#blurFilter)",
      }}
    />
  </g>
);
