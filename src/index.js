import _render from './render';

import { initPhysics } from "./physics/base";
import { App } from "./App";
import { store } from "./store/slice";
import { renderToDOM } from "./render/renderToDOM";

const initApp = () => {
    initPhysics(store);
    renderToDOM("#entry-point", <App />);
}

document.addEventListener("DOMContentLoaded", initApp);

