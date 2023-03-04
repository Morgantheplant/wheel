import _render from "packages/render";
import { toggleSidebar, WheelState, WheelStore } from "src/store/wheelSlice";

export const SideBarFade = (props: { state: WheelState; dispatch: dispatch }) =>{
  return (
    <div
      style={{
        position: "absolute",
        top: "0p",
        right: "0",
        bottom: "0",
        left: '0',
        transition: "opacity .3s ease-out",
      }}
      selector={(state: WheelState) => state.sideBarOpen}
      connect={(sideBarOpen) => ({
        style: {
          opacity: sideBarOpen ? 0.8 : 0,
        },
      })}
      onClick={() => {
        props.dispatch(toggleSidebar(false));
      }}
    />

  );
};
