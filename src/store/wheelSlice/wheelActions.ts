import { createAction } from "packages/store/createAction";
import { ActionType } from "./constants";

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

export type WheelAction =
  | ReturnType<typeof updatePosition>
  | ReturnType<typeof updateViewportSize>
  | ReturnType<typeof toggleSidebar>
  | ReturnType<typeof updateWheelSlice>;
