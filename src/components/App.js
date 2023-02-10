import _render from "_render";
import { store, updateSpinStatus } from "../store/slice";
import { SvgBackground } from "./SvgBackground";
import { Wheel } from "./wheel/Wheel";
import { Stopper } from "./stopper/Stopper";
import { WHEEL_SLICE_COUNT } from "../settings";
import { Stand } from "./stopper/Stand";
import { Scoreboard } from "./scoreboard/Scoreboard";
import { wheelSelector } from "../selectors/wheelSelector";
import { pegsSelector } from "../selectors/pegSelector";
import { SPIN_STATUS } from "../contants/wheel";
import { isMobile } from "../utils/detectMobile";


const wheelInititalPosition = (state) => {
  const wheel = wheelSelector(state);
  return {
    center: {
      x: wheel.initialXPosition,
      y: wheel.initialYPosition,
    },
    radius: wheel.initialRadius,
  };
};


const getUASpinEvents = ({ handleDragWheel, handleReleaseWheel}) =>{
  // sniff user agent to attach mobile vs desktop events
  const isMobileDevice = isMobile();
  const startEvent = isMobileDevice ? "onTouchStart" : "onMouseDown";
  const endEvent = isMobileDevice ? "onTouchEnd": "onMouseUp"
  return {
    [startEvent]: handleDragWheel,
    [endEvent]: handleReleaseWheel
  }
} 

export const App = () => {
  const { height, width, ...state } = store.getState();
  const { center, radius } = wheelInititalPosition(state);
  const handleDragWheel = ()=>{
    store.dispatch(updateSpinStatus(SPIN_STATUS.DRAGGING))
  }
  const handleReleaseWheel = ()=>{
    store.dispatch(updateSpinStatus(SPIN_STATUS.SPINNING))
  }
  const spinEvents = getUASpinEvents({ handleDragWheel, handleReleaseWheel })
  return (
    <main store={store}>
      <h1 className="main__title">Wheel of Fortune</h1>
      <Scoreboard />
      <div classname="main__svg-container"
        {...spinEvents} 
        style={{ position: "absolute", "pointer-events": "none" }}
        >
        <SvgBackground height={height} width={width}>
          <Stand height={height} wheelCenter={center} wheelRadius={radius} />
          <Wheel
            center={center}
            radius={radius}
            sliceCount={WHEEL_SLICE_COUNT} // todo: move to store
            pegs={pegsSelector(state)}
            height={height}
            width={width}
          />
          <Stopper />
        </SvgBackground>
      </div>
      <Scoreboard />
    </main>
  );
};
