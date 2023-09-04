import { createAction } from "packages/store/createAction";
import { ActionType } from "./constants";
import { WheelSlice } from "./wheelReducer";

export const updatePosition = createAction<ActionType.UPDATE_POSITION, Matter.Body[]>(
  ActionType.UPDATE_POSITION
);
export const updateViewportSize = createAction<
  ActionType.UPDATE_VIEWPORT_SIZE,
  { height: number; width: number }
>(ActionType.UPDATE_VIEWPORT_SIZE);
export const toggleSidebar = createAction<
  ActionType.TOGGLE_SIDEBAR,
  boolean | undefined
>(ActionType.TOGGLE_SIDEBAR);
export const updateWheelSlice = createAction<
  ActionType.UPDATE_WHEEL_SLICE,
  { index: number; text: string, color?: string, hidden?: boolean }
>(ActionType.UPDATE_WHEEL_SLICE);
export const addSlice = createAction<ActionType.ADD_SLICE, WheelSlice>(ActionType.ADD_SLICE);
export const removeSlice = createAction<ActionType.REMOVE_SLICE, number>(ActionType.REMOVE_SLICE);

export type WheelAction =
  | ReturnType<typeof updatePosition>
  | ReturnType<typeof updateViewportSize>
  | ReturnType<typeof toggleSidebar>
  | ReturnType<typeof updateWheelSlice>
  | ReturnType<typeof addSlice>
  | ReturnType<typeof removeSlice>;
