import _render, { renderToDOM } from "packages/render";
import { initPhysics } from "./physics/base";
import { App } from "./components/App";
import { store, updateViewportSize } from "./store/wheelSlice";
import { debounce } from "./utils/debounce";

const initDOM = (options: {
  onBeforeStart: () => void;
  onBeforeReset: () => void;
  entry?: Element;
  selector: string;
}) => {
  let DOMContext = options;
  const reset = () => {
    options.onBeforeReset();
    DOMContext.entry?.firstChild?.remove();
    DOMContext.entry = renderToDOM(DOMContext.selector, <App reset={reset} />);
  };
  return {
    start: () => {
      options.onBeforeStart();
      DOMContext.entry = renderToDOM(
        DOMContext.selector,
        <App reset={reset} />
      );
    },
    reset,
  };
};

const initApp = () => {
  // update store with inital viewport size
  store.dispatch(
    updateViewportSize({ height: window.innerWidth, width: window.innerWidth })
  );
  const physicsEntry = initPhysics(store, { debug: false });
  const domEntry = initDOM({
    onBeforeStart: () => physicsEntry.start(),
    onBeforeReset: () => physicsEntry.reset(),
    selector: "#entry-point",
  });
  
  domEntry.start();
  
  // add window resize events
  window.addEventListener(
    "resize",
    debounce(() => {
      store.dispatch(
        updateViewportSize({
          height: window.innerWidth,
          width: window.innerWidth,
        })
      );
      domEntry.reset();
    }, 1000)
  );
};

document.addEventListener("DOMContentLoaded", initApp);
