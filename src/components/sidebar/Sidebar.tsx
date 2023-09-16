import _render from "packages/render";
import { sidebarSelector } from "src/selectors/sidebarSelector";
import {
  addSlice,
  MAX_SLICES,
  removeSlice,
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
});

export const SideBar = (props: {
  dispatch: WheelStore["dispatch"];
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
          paddingBottom: "40px",
          overflowY: "scroll",
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
          <Close width="24px" height="24px" color={"black"} />
        </button>
        <aside style={{ padding: "0px 20px" }}>
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
                onRemove={(index) => {
                  props.dispatch(removeSlice(index));
                }}
                slice={slice}
                total={props.state.slices.length}
              />
            );
          })}
          <button
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              margin: "40px auto",
              width: "100%",
              padding: "10px",
              border: "none",
            }}
            disabled={props.state.slices.length >= MAX_SLICES}
            onClick={() => {
              props.dispatch(addSlice({ text: "Enter Text" }));
            }}
          >
            Add Slice +
          </button>
        </aside>
      </div>
    </fragment>
  );
};
