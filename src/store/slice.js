import { createAction } from "./createAction";
import { createStore } from "./createStore";

export const UPDATE_POSITION = "UPDATE_POSITION";
export const UPDATE_VIEWPORT_SIZE = "UPDATE_VIEWPORT_SIZE";
export const COLLISION_DETECTED = "COLISSION_DETECTED";

export const updatePosition = createAction(UPDATE_POSITION);
export const updateViewportSize = createAction(UPDATE_VIEWPORT_SIZE);
export const collisionDetected = createAction(COLLISION_DETECTED);

const defaultState = {
  bodies: [],
  height: 700,
  width: 700
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
      case COLLISION_DETECTED:
        return {
          ...state,
          current_collided: action.payload,
          previous_collided: state.current_collided
        }  
       default:   
        return state;
    }
  }

export const store = createStore(wheelReducer, defaultState);