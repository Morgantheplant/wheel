export const svgns = "http://www.w3.org/2000/svg";
// filters out HTML tags with naming collision
export const svgElements = new Set([
  "rect",
  "circle",
  "svg",
  "polyline",
  "polygon",
  "ellipse",
  "path",
  "defs",
  "linearGradient",
  "stop",
  "g",
  "text",
  "filter",
  "feGaussianBlur",
]);
