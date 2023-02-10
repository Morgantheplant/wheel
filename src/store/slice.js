import { SPIN_STATUS } from "../contants/wheel";
import { createAction } from "./createAction";
import { createStore } from "./createStore";

export const UPDATE_POSITION = "UPDATE_POSITION";
export const UPDATE_VIEWPORT_SIZE = "UPDATE_VIEWPORT_SIZE";
export const UPDATE_SPIN_STATUS = "UPDATE_SPIN_STATUS";

export const updatePosition = createAction(UPDATE_POSITION);
export const updateViewportSize = createAction(UPDATE_VIEWPORT_SIZE);
export const updateSpinStatus = createAction(UPDATE_SPIN_STATUS);

const defaultState = {
  bodies: [],
  height: 700,
  width: 700,
  spinStatus: SPIN_STATUS.IDLE
}

export const wheelReducer = (state=defaultState, action={}) => {
    switch(action.type){
      case UPDATE_POSITION:
        return {...state, bodies: action.payload};
      case UPDATE_VIEWPORT_SIZE:
        return {
          ...state,
          height: action.payload.height,
          width: action.payload.width
        }
      case SPIN_STATUS:
        return {
          ...state,
          spinStatus: action.payload
        }

       default:   
        return state;
    }
  }

export const store = createStore(wheelReducer, defaultState);