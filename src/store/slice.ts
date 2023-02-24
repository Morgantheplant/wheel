import { Body } from "matter-js";
import { SPIN_STATUS } from "../contants/wheel";
import { createAction } from "../../packages/store/createAction";
import { createStore } from "../../packages/store/createStore";

export enum ActionType {
  UPDATE_POSITION = "UPDATE_POSITION",
  UPDATE_VIEWPORT_SIZE = "UPDATE_VIEWPORT_SIZE",
  UPDATE_SPIN_STATUS = "UPDATE_SPIN_STATUS",
}

export const updatePosition = createAction<
  ActionType.UPDATE_POSITION,
  Body[]
>(ActionType.UPDATE_POSITION);
export const updateViewportSize = createAction<
  ActionType.UPDATE_VIEWPORT_SIZE,
  { height: number; width: number }
>(ActionType.UPDATE_VIEWPORT_SIZE);
export const updateSpinStatus = createAction<
  ActionType.UPDATE_SPIN_STATUS,
  SPIN_STATUS
>(ActionType.UPDATE_SPIN_STATUS);


export type WheelAction =
  | ReturnType<typeof updatePosition>
  | ReturnType<typeof updateSpinStatus>
  | ReturnType<typeof updateViewportSize>;

export type WheelSlice = {
  text: string,
  color?: string;
}

export type WheelState = {
  bodies: Body[],
  height: number,
  width: number,
  spinStatus: SPIN_STATUS,
  sliceCount: number,
  slices?: WheelSlice[]
}

const defaultSlices = [
  {text: "$4000"},
  {text: "Lose A Turn"},
  {text: "$550"},
  {text: "$500"},
  {text: "$400"},
  {text: "$600"},
  {text: "Bankrupt"},
  {text: "$3500"},
  {text: "$900"},
  {text: "$0 Free Spin"},
  {text: "Surprise"},
  {text: "$50"}
]
const defaultState: WheelState = {
    bodies: [],
    height: 700,
    width: 700,
    spinStatus: SPIN_STATUS.IDLE,
    slices: defaultSlices,
    sliceCount: defaultSlices.length,
};

export const wheelReducer = (state = defaultState, action?: WheelAction) => {
  if(!action) return state;
  switch (action.type) {
    case ActionType.UPDATE_POSITION:
      return { ...state, bodies: action.payload };
    case ActionType.UPDATE_VIEWPORT_SIZE:
      return {
        ...state,
        height: action.payload.height,
        width: action.payload.width,
      };
    case ActionType.UPDATE_SPIN_STATUS:
      return {
        ...state,
        spinStatus: action.payload,
      };

    default:
      return state;
  }
};

export const store = createStore<WheelState, WheelAction>(wheelReducer, defaultState);
