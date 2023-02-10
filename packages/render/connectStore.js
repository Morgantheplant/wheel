import { connectElement } from "./connectElement";
import { subscribeHandlers } from "./subscribeHandlers";

export const connectStore = ({ element, elementProps, handlers, store }) => {
  const updatedHandlers = handlers.concat(
    connectElement(element, elementProps)
  );
  return subscribeHandlers({ store, handlers: updatedHandlers });
};
