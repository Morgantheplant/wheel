import _render from "packages/render";
import { sidebarSelector } from "src/selectors/sidebarSelector";
import {
  toggleSidebar,
  updateWheelSlice,
  WheelSlice,
  WheelState,
  WheelStore,
} from "src/store/wheelSlice";
import { Close } from "../icons/Close";
import { SideBarFade } from "./SideBarFade";
import { SideBarTrigger } from "./SideBarTrigger";
import { SliceSettings } from "./SliceSettings";


const sidebarTrasform = (sideBarOpen: boolean) => ({
  style: {
    transform: `translateX(${sideBarOpen ? 0 : "110%"})`,
  },
})

export const SideBar = (props: {
  dispatch: WheelStore["dispatch"];
  reset: () => void;
  state: WheelState;
}) => {
  return (
    <fragment>
      <SideBarTrigger {...props} />
      <SideBarFade {...props} />
      <div
        connect={sidebarTrasform}
        selector={sidebarSelector}
        style={{
          background: "rgba(196, 228, 245, 0.5)",
          bottom: "0",
          position: "absolute",
          right: "0",
          top: "0",
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
          width: "300px",
        }}
      >
        <button
          onClick={() => {
            props.dispatch(toggleSidebar(false));
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            margin: "10px",
          }}
        >
          <Close width="24px" height="24px" color={"black"}/>
        </button>
        <form style={{ padding: "0px 20px" }}>
          {props.state.slices?.map((slice: WheelSlice, index: number) => {
            return (
              <SliceSettings
                index={index}
                onChange={({
                  color,
                  hidden,
                  text,
                }: {
                  color?: string;
                  hidden?: boolean;
                  text: string;
                }) =>
                  props.dispatch(
                    updateWheelSlice({
                      color,
                      hidden,
                      index,
                      text,
                    })
                  )
                }
                slice={slice}
                total={props.state.slices?.length || 0}
              />
            );
          })}
        </form>
      </div>
    </fragment>
  );
};
