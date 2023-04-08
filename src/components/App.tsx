import _render, { setStyles } from "packages/render";

import { SvgBackground } from "./SvgBackground";
import { Wheel } from "./wheel/Wheel";
import { Stopper } from "./stand/Stopper";
import { Stand } from "./stand/Stand";
import { Scoreboard } from "./stand/Scoreboard";
import { wheelSelector } from "../selectors/wheelSelector";
import { pegsSelector } from "../selectors/pegSelector";
import { createStore } from "packages/store/createStore";
import { Title } from "./title/Title";
import { SideBar } from "./sidebar/SideBar";
import { store, WheelState } from "src/store/wheelSlice";

const wheelInititalPosition = (state: WheelState) => {
  const wheel = wheelSelector(state);
  return {
    center: {
      x: wheel.plugin.initialXPosition,
      y: wheel.plugin.initialYPosition,
    },
    radius: wheel.plugin.initialRadius,
  };
};

export const App = (props: { reset: () => void }) => {
  const state = store.getState();
  const { center, radius } = wheelInititalPosition(state);
  return (
    <main store={store as ReturnType<typeof createStore>}>
      <div
        className="main__svg-container"
        style={{
          background: 'url("static/background.png")',
          userSelect: "none",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onMouseDown={(e) => {
          setStyles(e.target as HTMLElement, { cursor: "grabbing" });
        }}
        onMouseUp={(e) => {
          setStyles(e.target as HTMLElement, { cursor: "grab" });
        }}
      >
        <Stand
          height={state.height}
          wheelCenter={center}
          wheelRadius={radius}
        />
        <Wheel
          center={center}
          radius={radius}
          sliceCount={state.sliceCount}
          slices={state.slices}
          pegs={pegsSelector(state)}
          height={state.height}
          width={state.width}
        />
        <Stopper />

        <Scoreboard />
      </div>
      <Title>Wheel of Misfortune</Title>
      <SideBar reset={props.reset} state={state} dispatch={store.dispatch} />
    </main>
  );
};
