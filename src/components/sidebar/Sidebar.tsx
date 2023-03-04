import _render from "packages/render";
import { toggleSidebar, WheelSlice, WheelState, WheelStore } from "src/store/wheelSlice";
import { SideBarFade } from "./SideBarFade";
import { SideBarTrigger } from "./SideBarTrigger";
import { SliceSettings } from "./SliceSettings";

export const SideBar = (props: { state: WheelState; dispatch: WheelStore, reset: ()=> void }) => {
  return (
    <fragment>
    <SideBarFade {...props} />
    <div
      style={{
        position: "absolute",
        width: "40%",
        bottom: '0',
        background: "grey",
        right: '0',
        top: '0',
        transition: 'transform 1s ease-in',
      }}
      selector={(state:WheelState) => state.sideBarOpen}
      connect={(sideBarOpen) => ({
        style: {
          transform: `translateX(${sideBarOpen ? 0 : "100%"})`,
        },
      })}
    >
      <button
        onClick={() => {
          props.dispatch(toggleSidebar(false));
        }}
      >
        X
      </button>
      <form>
        {props.state.slices?.map((slice: WheelSlice, index: number) => {
          return <SliceSettings slice={slice} index={index} />;
        })}
      </form>
    </div>
    <SideBarTrigger {...props} />
    </fragment>
  );
};
