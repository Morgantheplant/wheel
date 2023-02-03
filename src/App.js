import _render from "./render";
import { store } from "./store/slice";
import { SvgBackground } from "./components/SvgBackground";
import { Wheel } from "./components/wheel/Wheel";
import { Stopper } from "./components/stopper/Stopper";


export const App = () => {
    const {height, width} = store.getState();
    return (
        <main store={store} >
        <h1 className="main__title">
            Wheel of Fortune
        </h1>
        <div style={{position: "absolute", "pointer-events": "none"}}>
        <SvgBackground height={height} width={width}>
          <Wheel center={width/2} pegCount={15}/>  
          <Stopper />
        </SvgBackground>
        </div>
        </main>
    );
  };


    