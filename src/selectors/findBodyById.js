export const findBodyById = (id) => (state) =>
  state.bodies.find((body) => body.id === id);
