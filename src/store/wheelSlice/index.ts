import { createStore, Store } from "packages/store/createStore";
import { WheelAction } from "./wheelActions";
import { defaultState, wheelReducer, WheelState } from "./wheelReducer";
export * from "./constants"
export * from "./wheelActions"
export * from "./wheelReducer"

export const store = createStore<WheelState, WheelAction>(
    wheelReducer,
    defaultState
  );
  
export type WheelStore = Store<WheelState, WheelAction>