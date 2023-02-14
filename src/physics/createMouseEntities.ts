import { Engine, Mouse, MouseConstraint, Render } from "matter-js";

export const createMouseEntities = ({engine, collisionFilterMask, render }: {engine: Engine, collisionFilterMask: number, render: Render }) => {
  const mouse = Mouse.create(document.body);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: ({
      angularStiffness: 0, // not added to types
      render: {
        visible: true,
      },
    } as Matter.IConstraintDefinition),
  });
  mouseConstraint.collisionFilter.mask = collisionFilterMask;
  // keep the mouse in sync with rendering
  render.mouse = mouse;
  return [mouse, mouseConstraint]
};
