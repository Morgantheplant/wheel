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
export const editSlice = createAction<
  ActionType.SET_EDIT_SLICE,
  { index: number; isEditing: boolean }
>(ActionType.SET_EDIT_SLICE);

export type WheelAction =
  | ReturnType<typeof updatePosition>
  | ReturnType<typeof updateViewportSize>
  | ReturnType<typeof toggleSidebar>
  | ReturnType<typeof editSlice>;
