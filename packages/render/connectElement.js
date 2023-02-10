import { memoTransform } from "./memoTransform";
import { updateElement } from "./updateElement";

// initilize handlers and "connect" component to store
// since app only renders once, connect gives and API for updates
export const connectElement = (element, { selector, connect, ...props }) => {
  if (!connect) return [];
  // memoize transform calls so only changes applies
  const memoizedUpdater = memoTransform(connect);

  const handler = (state) => {
    const selection = selector ? selector(state) : state;
    if (connect) {
      // similar args to mapStateToProps
      // https://react-redux.js.org/api/connect#connect-parameters
      const elementUpdates = memoizedUpdater(selection, props);
      elementUpdates && updateElement(element, elementUpdates);
    }
  };
  return [handler];
};
