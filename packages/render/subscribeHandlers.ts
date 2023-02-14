import { createStore } from "../../src/store/createStore";
import { isNotProduction } from "../../src/utils/isNotProduction";
import { Handlers } from "./types";

export const subscribeHandlers = ({ store, handlers }: {
  store: ReturnType<typeof createStore> | null,
  handlers: Handlers[]
}) => {
  if (store) {
    handlers.forEach((handler: Handlers) => {
      store.subscribe(handler);
    });
    // initialize store (store should only be added 1x in tree)
    store.dispatch({ type: "@@INIT" });
    
    if (isNotProduction()) {
      (window as any).dispatch = store.dispatch;
    }
    return { store, handlers: [] };
  }

  return { store, handlers };
};
