import { Mouse, MouseConstraint } from "matter-js";

export const createMouseEntities = ({engine, collisionFilterMask, render }) => {
  const mouse = Mouse.create(document.body);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      angularStiffness: 0,
      render: {
        visible: true,
      },
    },
  });
  mouseConstraint.collisionFilter.mask = collisionFilterMask;
  // keep the mouse in sync with rendering
  render.mouse = mouse;
  return [mouse, mouseConstraint]
};
