import _render from "./render";
import { store } from "./store/slice";
import { SvgBackground } from "./components/SvgBackground";
import { Wheel } from "./components/wheel/Wheel";
import { Stopper } from "./components/stopper/Stopper";
import { PEG_COUNT, WHEEL_SLICE_COUNT } from "./settings";


export const App = () => {
    const {height, width} = store.getState();
    return (
        <main store={store} >
        <h1 className="main__title">
            Wheel of Fortune
        </h1>
        <div style={{position: "absolute", "pointer-events": "none"}}>
        <SvgBackground height={height} width={width}>
          <Wheel sliceCount={WHEEL_SLICE_COUNT} pegCount={PEG_COUNT}/>  
          <Stopper />
        </SvgBackground>
        </div>
        </main>
    );
  };


    