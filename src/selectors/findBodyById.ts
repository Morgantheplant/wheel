import { WheelState } from "../store/slice";

export const findBodyById = (() => {
  // cache indexes since they are stable
  const cache: {[key: string]: number} = {};
  return (id: string) => (state: WheelState) => {
    const index =
      !cache.hasOwnProperty("id")
        ? state.bodies.findIndex((body) => body.label === id)
        : cache[id];

    return state.bodies[index];
  };
})();
