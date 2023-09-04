import _render from "packages/render";
import { sidebarSelector } from "src/selectors/sidebarSelector";
import { toggleSidebar, WheelState } from "src/store/wheelSlice";
import { Hamburger } from "../icons/Hamburger";


const sidebarTriggerTransform = (sideBarOpen:boolean) => ({
  style: {
    transform: `rotateY(${sideBarOpen ? "90deg" : "0"})`,
  },
})

export const SideBarTrigger = (props: { state: WheelState; dispatch: any }) => {
  return (
    <button
      className="sidebar__trigger"
      connect={sidebarTriggerTransform}
      onClick={() => {
        props.dispatch(toggleSidebar(true));
      }}
      selector={sidebarSelector}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        position: "absolute",
        right: "20px",
        top: "20px",
        transition: "transform .3s",
        height: "30px",
        width: "30px",
        backgroundColor: "red",
        zIndex: "1000"
      }}
    >
      <Hamburger style={{pointerEvents: "none"}} fill="#b0b0be" height="24px" width="24px"  />
    </button>
  );
};
