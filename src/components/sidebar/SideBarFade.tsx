import _render from "packages/render";
import { sidebarSelector } from "src/selectors/sidebarSelector";
import { toggleSidebar, WheelState, WheelStore } from "src/store/wheelSlice";

const sidebarFadeTransform = (sideBarOpen: boolean) => ({
  style: {
    opacity: sideBarOpen ? 0.6 : 0,
    pointerEvents: sideBarOpen ? "all" : "none",
  },
});

export const SideBarFade = (props: {
  dispatch: WheelStore["dispatch"];
  state: WheelState;
}) => {
  return (
    <div
      className="sidebar__fade"
      connect={sidebarFadeTransform}
      onClick={() => {
        props.dispatch(toggleSidebar(false));
      }}
      selector={sidebarSelector}
      style={{
        backgroundColor: "black",
        bottom: "0",
        left: "0",
        position: "absolute",
        right: "0",
        top: "0",
        transition: "opacity .3s ease-out",
      }}
    />
  );
};
