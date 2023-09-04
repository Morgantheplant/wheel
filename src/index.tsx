import _render, { renderToDOM } from "packages/render";
import { initPhysics } from "./physics/base";
import { App } from "./components/App";
import { store, updateViewportSize } from "./store/wheelSlice";
import { debounce } from "./utils/debounce";
import { getSliceCount } from "./selectors/getSliceCount";

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
    updateViewportSize({ height: window.innerHeight, width: window.innerWidth })
  );

  /* ---  TOGGLE DEBUG HERE  --- */
  const physicsEntry = initPhysics(store, { debug: false });
  const domEntry = initDOM({
    onBeforeStart: () => physicsEntry.start(),
    onBeforeReset: () => physicsEntry.reset(),
    selector: "#entry-point",
  });

  domEntry.start();

  // handle full re-render for adding removing slices
  let sliceCount = getSliceCount(store.getState());
  store.subscribe((state) => {
    const currentSliceCount = getSliceCount(state);
    if (currentSliceCount !== sliceCount) {
      sliceCount = currentSliceCount;
      domEntry.reset();
    }
  });

  // add window resize events
  window.addEventListener(
    "resize",
    debounce(() => {
      store.dispatch(
        updateViewportSize({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      );
      domEntry.reset();
    }, 100)
  );
};

document.addEventListener("DOMContentLoaded", initApp);
