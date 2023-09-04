import { ActionType, MAX_SLICES, MIN_SLICES } from "./constants";
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
  slices: WheelSlice[];
  sideBarOpen: boolean;
};

const defaultSlices = [
  { text: "FAMILY FUED" },
  { text: "GIVE 1 POINT" },
  { text: "TAKE 1 POINT" },
  { text: "PICK A SKIP" },
  { text: "PICTIONARY" },
  { text: "KAZOO" },
  { text: "CHARADE" },
  { text: "SKIP" },
];



export const defaultState: WheelState = {
  bodies: [],
  height: 700,
  width: 700,
  slices: defaultSlices,
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
    case ActionType.ADD_SLICE:
      if (state.slices.length >= MAX_SLICES) return state;
      return {
        ...state,
        slices: [...state.slices, action.payload],
      };
    case ActionType.REMOVE_SLICE:
      if (state.slices.length <= MIN_SLICES) return state
        return {
          ...state,
          slices: state.slices.filter((_, index) => index !== action.payload),
        };
      
    default:
      return state;
  }
};
