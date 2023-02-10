import _render, { renderToDOM } from '_render';

import { initPhysics } from "./physics/base";
import { App } from "./components/App";
import { store } from "./store/slice";

const initApp = () => {
    initPhysics(store);
    renderToDOM("#entry-point", <App />);
}

document.addEventListener("DOMContentLoaded", initApp);

