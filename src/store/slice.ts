import { Body } from "matter-js";
import { SPIN_STATUS } from "../contants/wheel";
import { createAction } from "./createAction";
import { createStore } from "./createStore";

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


export type WheelState = {
  bodies: Body[],
  height: number,
  width: number,
  spinStatus: SPIN_STATUS
}

const defaultState:WheelState = {
    bodies: [],
    height: 700,
    width: 700,
    spinStatus: SPIN_STATUS.IDLE,
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
