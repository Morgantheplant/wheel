import { ActionType } from "./constants";
import { WheelAction } from "./wheelActions";

export type WheelSlice = {
  text: string;
  color?: string;
  hidden?: boolean;
};

export type WheelState = {
  bodies: Matter.Body[];
  height: number;
  width: number;
  sliceCount: number;
  slices?: WheelSlice[];
  sideBarOpen: boolean;
};

const defaultSlices = [
  { text: "$4000" },
  { text: "Lose A Turn" },
  { text: "$550" },
  { text: "$500" },
  { text: "$400" },
  { text: "$600" },
  { text: "Bankrupt" },
  { text: "$3500" },
  { text: "$900" },
  { text: "$0 Free Spin" },
  { text: "Surprise" },
  { text: "$50" },
].map((item) => ({ ...item, isEditing: false }));

export const defaultState: WheelState = {
  bodies: [],
  height: 700,
  width: 700,
  slices: defaultSlices,
  sliceCount: defaultSlices.length,
  sideBarOpen: false,
};

export const wheelReducer = (state = defaultState, action?: WheelAction) => {
  if (!action) return state;
  switch (action.type) {
    case ActionType.UPDATE_POSITION:
      return { ...state, bodies: action.payload };
    case ActionType.UPDATE_VIEWPORT_SIZE:
      return {
        ...state,
        height: action.payload.height,
        width: action.payload.width,
      };
    case ActionType.TOGGLE_SIDEBAR:
      return {
        ...state,
        sideBarOpen: action.payload ?? !state.sideBarOpen,
      };
    case ActionType.UPDATE_WHEEL_SLICE:
      return {
        ...state,
        slices: state.slices?.length
          ? state.slices.map((slice, i) => {
              const { index, ...rest } = action.payload;
              return i !== index ? slice : { ...slice, ...rest };
            })
          : [],
      };
    default:
      return state;
  }
};
