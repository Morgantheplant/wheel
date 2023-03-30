import { Composite, Engine, Mouse, Render } from "matter-js";
import { WheelStore } from "src/store/wheelSlice";

export const createDebugger = ({
  engine,
  mouse,
  screenHeight,
  screenWidth,
  store,
}: {
  engine: Engine;
  mouse: Mouse;
  screenHeight: number;
  screenWidth: number;
  store: WheelStore;
}) => {
  // print bodies to console on keydown
  window.addEventListener("keydown", () => {
    const bodies = Composite.allBodies(engine.world);
    console.log(bodies[0]);
  });

  (window as any).store = store;

  const entry = document.querySelector("#entry-point");
  const button = document.createElement("button");
  button.innerText = "Debug: Hide SVG";
  button.setAttribute("style", "position: absolute; bottom: 10px; right: 10px;");
  let hidden = false;
  button.addEventListener("click", () => {
    hidden = !hidden;
    entry?.setAttribute("style", `display: ${hidden ? "none" : "block"}`);
    button.innerText = hidden ? "Debug: Show SVG" : "Debug: Hide SVG";
  });
  document.body.appendChild(button);
  button.click()

  // create a renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: screenWidth,
      height: screenHeight,
      showStats: true,
      showDebug: true,
    },
  });
  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // run the Matter js canvas renderer

  Render.run(render);
};
