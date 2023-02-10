export const subscribeHandlers = ({ store, handlers }) => {
    if (store) {
      handlers.forEach((handler) => {
        store.subscribe(handler);
      });
      // initialize store (store should only be added 1x in tree)
      store.dispatch({ type: "@@INIT" });
      //   if(process.env.NODE_ENV === "DEBUG"){
      //     window.dispatch = state.store.dispatch;
      //   }
      return { store, handlers: [] };
    }
  
    return { store, handlers };
  };