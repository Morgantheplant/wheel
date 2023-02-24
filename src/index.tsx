import _render, { renderToDOM } from 'packages/render';

import { initPhysics } from "./physics/base";
import { App } from "./components/App";
import { store, updateViewportSize } from "./store/slice";

const initApp = () => {
    store.dispatch(updateViewportSize({height: window.innerWidth, width: window.innerWidth}))
    initPhysics(store, {debug: false});
    renderToDOM("#entry-point", <App />);

}

document.addEventListener("DOMContentLoaded", initApp);

