export const createStore = (reducer, initialState) => {
  let state = reducer(initialState);
  let listeners = [];
  return {
    dispatch: (action) => {
      state = reducer(state, action);
      const listenersCopy = listeners.slice()
      listenersCopy.map(listener=>listener(state));
    },
    getState: () => state,
    subscribe: (handler)=> {
      listeners.push(handler);
      handler(state)
    },
    unsubscribe: (listenerToRemove)=> {
      listeners = listeners.filter(listener => listener !=listenerToRemove)
    }
  };
};


