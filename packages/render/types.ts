import { ReactNode } from "react";
import { createStore } from "packages/store/createStore";

export type ElementEvents = {
  [key: string]: EventListenerOrEventListenerObject;
};
export type HTMLStyleAttribute = {
  style?: CSSStyleDeclaration;
};
export type ElementAttributes = ElementEvents &
  HTMLStyleAttribute & {
    [key: string]: number | string;
  };
export type Props = {
  store?: ReturnType<typeof createStore>;
  selector?: (state: object) => any;
  connect?: (selection: any) => object;
  ref?: (props: HTMLElement | SVGElement) => void;
};

export type Children = ReactNode[] | ReactNode
export type Component = (props: Props & {children?: ReactNode[]}) => HTMLElement
export type Handlers = (state: object) => void;

export type State = {
  handlers: Array<(state: object) => void>;
  store: ReturnType<typeof createStore> | null;
};