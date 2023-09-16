type Reducer<S extends object, A extends object> = (state: S, action?: A) => S;
type Listener<S extends object> = (state: S) => void;

export type Store <S extends object, A extends object>= {
  dispatch: (action: A) => void;
  getState: ()=> S,
  subscribe: (handler: Listener<S>)=> void; 
  unsubscribe: (listenerToRemove: Listener<S>)=> void
  reset: () => void;
  listeners:  Listener<S>[];
} 

export const createStore = <S extends object, A extends object>(
  reducer: Reducer<S, A>,
  initialState: S
): Store<S, A> => {
  let state = reducer(initialState);
  let listeners: Listener<S>[] = [];
  return {
    dispatch: (action: A): void => {
      state = reducer(state, action);
      const listenersCopy = listeners.slice();
      listenersCopy.map((listener) => listener(state));
    },
    getState: (): S => state,
    subscribe: (handler: Listener<S>): void => {
      listeners.push(handler);
      (window as any).items = listeners
      handler(state);
    },
    unsubscribe: (listenerToRemove: Listener<S>): void => {
      listeners = listeners.filter((listener) => listener != listenerToRemove);
    },
    reset: () => {
      listeners = []
    },
    listeners
  };
};
