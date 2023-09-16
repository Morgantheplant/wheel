import _render, { setStyles } from "packages/render";
import { Wheel } from "./wheel/Wheel";
import { Stopper } from "./stand/Stopper";
import { Stand } from "./stand/Stand";
import { Scoreboard } from "./stand/Scoreboard";
import { wheelSelector } from "../selectors/wheelSelector";
import { pegsSelector } from "../selectors/pegSelector";
import { Title } from "./title/Title";
import { SideBar } from "./sidebar/SideBar";
import { WheelState, WheelStore } from "src/store/wheelSlice";
import { createStore } from "packages/store/createStore";

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

export const App = ({ _store: store }: { _store: WheelStore }) => {
  const state = store.getState();
  const { center, radius } = wheelInititalPosition(state);
  return (
    <main store={store as ReturnType<typeof createStore>}>
      <div
        id="main__svg-container"      
        className="main__svg-container"
        style={{
          background: 'url("static/background.png")',
          userSelect: "none",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          touchAction: "none"
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
          slices={state.slices}
          pegs={pegsSelector(state)}
          height={state.height}
          width={state.width}
        />
        <Stopper />

        <Scoreboard />
      </div>
      <Title>Wheel of Misfortune</Title>
      <SideBar state={state} dispatch={store.dispatch} />
    </main>
  );
};
