import _render from "packages/render";
import { Children } from "packages/render/types";
import { CSSProperties } from "react";

export const SvgBackground = ({
  children,
  ...rest
}: {
  width: number;
  height: number;
  style?: CSSProperties;
  children: Children;
} & JSX.IntrinsicElements["svg"]) => {
  return (
    <svg version="1.1" {...rest}>
      {children}
    </svg>
  );
};
