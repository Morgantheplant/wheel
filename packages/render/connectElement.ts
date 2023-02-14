import { memoTransform } from "./memoTransform";
import { ElementAttributes, Props } from "./types";
import { updateElement } from "./updateElement";

// initilize handlers and "connect" component to store
// since app only renders once, connect gives and API for updates
export const connectElement = (
  element: HTMLElement | SVGElement,
  { selector, connect, ...props }: Props
) => {
  if (!connect) return [];
  // memoize transform calls so only changes applies
  const memoizedUpdater = memoTransform(connect);

  const handler = (state: object) => {
    const selection = selector ? selector(state) : state;

    // similar args to mapStateToProps
    // https://react-redux.js.org/api/connect#connect-parameters
    const elementUpdates = memoizedUpdater(selection, props as ElementAttributes);
    elementUpdates && updateElement(element, elementUpdates);
  };
  return [handler];
};
