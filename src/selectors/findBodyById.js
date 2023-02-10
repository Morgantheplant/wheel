export const findBodyById = (() => {
  // cache indexes since they are stable
  const cache = {};
  return (id) => (state) => {
    const index =
      cache[id] === undefined
        ? state.bodies.findIndex((body) => body.id === id)
        : cache[id];

    return state.bodies[index];
  };
})();
