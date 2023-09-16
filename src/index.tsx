import _render, { renderToDOM } from "packages/render";
import { initPhysics } from "./physics/base";
import { App } from "./components/App";
import {
  WheelStore,
  createWheelStore,
  updateViewportSize,
} from "./store/wheelSlice";
import { debounce } from "./utils/debounce";
import { getSliceCount } from "./selectors/getSliceCount";

const initDOM = ({
  onBeforeReset,
  onBeforeStart,
  selector,
  store,
}: {
  onBeforeStart: () => void;
  onBeforeReset: () => void;
  selector: string;
  store: WheelStore;
}) => {
  let entry: Element;
  return {
    start: () => {
      onBeforeStart();
      entry = renderToDOM(selector, <App _store={store} />);
    },
    reset: () => {
      onBeforeReset();
      entry?.firstChild?.remove();
      entry = renderToDOM(selector, <App _store={store} />);
    },
  };
};

const initApp = () => {
  const store = createWheelStore();

  
  let sliceCount = getSliceCount(store.getState());
  const resetStore = () => {
    store.reset();
    // handle full re-render for adding removing slices
    store.subscribe((state) => {
      const currentSliceCount = getSliceCount(state);
      if (currentSliceCount !== sliceCount) {
        sliceCount = currentSliceCount;
        domEntry.reset();
      }
    });
    // handle updating to Window size
    store.dispatch(
      updateViewportSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    );
  };

  /* ---  TOGGLE DEBUG HERE  --- */
  const physicsEntry = initPhysics(store, { debug: false });

  const domEntry = initDOM({
    onBeforeStart: () => {
      resetStore();
      physicsEntry.start();
    },
    onBeforeReset: () => {
      resetStore();
      physicsEntry.reset();
    },
    selector: "#entry-point",
    store,
  });

  domEntry.start();

  // add window resize events
  window.addEventListener("resize", debounce(domEntry.reset, 100));
};

document.addEventListener("DOMContentLoaded", initApp);
