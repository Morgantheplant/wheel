import { connectElement } from "./connectElement";
import { subscribeHandlers } from "./subscribeHandlers";
import { Props, State } from "./types";

export const connectStore = ({ element, elementProps, handlers, store }: { element: HTMLElement | SVGElement, elementProps: Props} & State) => {
  const updatedHandlers = handlers.concat(
    connectElement(element, elementProps)
  );
  return subscribeHandlers({ store, handlers: updatedHandlers });
};
