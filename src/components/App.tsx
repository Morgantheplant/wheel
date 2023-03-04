import _render from "packages/render";

import { SvgBackground } from "./SvgBackground";
import { Wheel } from "./wheel/Wheel";
import { Stopper } from "./stopper/Stopper";
import { Stand } from "./stopper/Stand";
import { Scoreboard } from "./scoreboard/Scoreboard";
import { wheelSelector } from "../selectors/wheelSelector";
import { pegsSelector } from "../selectors/pegSelector";
import { createStore } from "packages/store/createStore";
import { Title } from "./title/Title";
import { SideBar } from "./sidebar/Sidebar";
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

// const getUASpinEvents = ({
//   handleDragWheel,
//   handleReleaseWheel,
// }: {
//   handleDragWheel: () => void;
//   handleReleaseWheel: () => void;
// }) => {
//   // sniff user agent to attach mobile vs desktop events
//   const isMobileDevice = isMobile();
//   const startEvent = isMobileDevice ? "onTouchStart" : "onMouseDown";
//   const endEvent = isMobileDevice ? "onTouchEnd" : "onMouseUp";
//   return {
//     [startEvent]: handleDragWheel,
//     [endEvent]: handleReleaseWheel,
//   };
// };

export const App = (props: {reset: () => void}) => {
  const state = store.getState();
  const { center, radius } = wheelInititalPosition(state);
  return (
    <main store={store as ReturnType<typeof createStore>}>
      <Title>Wheel of Misfortune</Title>
      <Scoreboard />
      <div
        className="main__svg-container"
        style={{ position: "absolute" }}
      >
        <SvgBackground
          style={{ background: 'url("static/background.png")', cursor: "grab" }}
          height={state.height}
          width={state.width}
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
        </SvgBackground>
      </div>
      <SideBar reset={props.reset} state={state} dispatch={store.dispatch} />
    </main>
  );
};
