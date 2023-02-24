import { Engine, Mouse, MouseConstraint, Render } from "matter-js";

export const createMouseEntities = ({
  engine,
  collisionFilterMask,
}: {
  engine: Engine;
  collisionFilterMask: number;
}): [Mouse, MouseConstraint] => {
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
  return [mouse, mouseConstraint];
};
