import _render from "packages/render";
import { store, updateSpinStatus, WheelState } from "../store/slice";
import { SvgBackground } from "./SvgBackground";
import { Wheel } from "./wheel/Wheel";
import { Stopper } from "./stopper/Stopper";
import { Stand } from "./stopper/Stand";
import { Scoreboard } from "./scoreboard/Scoreboard";
import { wheelSelector } from "../selectors/wheelSelector";
import { pegsSelector } from "../selectors/pegSelector";
import { SPIN_STATUS } from "../contants/wheel";
import { isMobile } from "../utils/detectMobile";
import { createStore } from "packages/store/createStore";
import { Title } from "./scoreboard/Title";

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

const getUASpinEvents = ({
  handleDragWheel,
  handleReleaseWheel,
}: {
  handleDragWheel: () => void;
  handleReleaseWheel: () => void;
}) => {
  // sniff user agent to attach mobile vs desktop events
  const isMobileDevice = isMobile();
  const startEvent = isMobileDevice ? "onTouchStart" : "onMouseDown";
  const endEvent = isMobileDevice ? "onTouchEnd" : "onMouseUp";
  return {
    [startEvent]: handleDragWheel,
    [endEvent]: handleReleaseWheel,
  };
};

export const App = () => {
  const state = store.getState();
  const { center, radius } = wheelInititalPosition(state);
  const handleDragWheel = () => {
    store.dispatch(updateSpinStatus(SPIN_STATUS.DRAGGING));
  };
  const handleReleaseWheel = () => {
    store.dispatch(updateSpinStatus(SPIN_STATUS.SPINNING));
  };
  const spinEvents = getUASpinEvents({ handleDragWheel, handleReleaseWheel });
  return (
    <main store={store as ReturnType<typeof createStore>}>
      <Title>Wheel of Misfortune</Title>
      <Scoreboard />
      <div
        className="main__svg-container"
        {...spinEvents}
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <SvgBackground
        style={{background: 'url("static/background.png")', cursor: 'grab'}}
        height={state.height} width={state.width}>
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
    </main>
  );
};
