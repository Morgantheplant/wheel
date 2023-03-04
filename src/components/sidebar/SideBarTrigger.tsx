import _render from "packages/render";
import { toggleSidebar, WheelState } from "src/store/wheelSlice";

export const SideBarTrigger = (props: { state: WheelState; dispatch: any }) => {
  return (
    <button
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        transition: "transform .5s ease-out",
      }}
      selector={(state: WheelState) => state.sideBarOpen}
      connect={(sideBarOpen) => ({
        style: {
          transform: `translateY(${sideBarOpen ? "-40px" : '0' })`,
        },
      })}
      onClick={() => {
        props.dispatch(toggleSidebar(true));
      }}
    >
      Show Settings
    </button>
  );
};
