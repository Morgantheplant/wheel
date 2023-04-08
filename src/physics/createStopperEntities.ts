import { Bodies, Constraint } from "matter-js";
import { STOPPER, STOPPER_LEFT, STOPPER_RIGHT } from "../contants/bodies";

export const createStopperEntities = ({
  stopperX,
  stopperY,
  stopperHeight,
  stopperWidth,
  stopperCollisionFilter,
}: {
  stopperX: number;
  stopperY: number;
  stopperHeight: number;
  stopperWidth: number;
  stopperCollisionFilter: Matter.ICollisionFilter;
}): [Matter.Body, Matter.Body, Matter.Body, Constraint] => {
  const stopper = Bodies.rectangle(
    stopperX,
    stopperY,
    stopperWidth,
    stopperHeight,
    {
      collisionFilter: stopperCollisionFilter,
      label: STOPPER,
      plugin: {
        initialWidth: stopperWidth,
        initialHeight: stopperHeight,
        initialXPosition: stopperX,
        initialYPosition: stopperY,
      },
    }
  );

  const stopperBase = 40;
  const stopperBaseLeft = Bodies.rectangle(
    stopperX - 30,
    75,
    stopperBase,
    stopperBase,
    {
      isStatic: true,
      label: STOPPER_LEFT,
      plugin: {
        initialHeight: stopperBase,
        initialWidth: stopperBase,
      },
    }
  );

  const stopperBaseRight = Bodies.rectangle(
    stopperX + 30,
    75,
    stopperBase,
    stopperBase,
    {
      isStatic: true,
      label: STOPPER_RIGHT,
      plugin: {
        initialHeight: stopperBase,
        initialWidth: stopperBase,
      },
    }
  );

  const nail = Constraint.create({
    pointA: { x: stopperX, y: stopperY },
    pointB: { x: 0, y: -10 },
    bodyB: stopper,
    length: 0,
    damping: 0.1,
    stiffness: 1,
  });
  return [stopper, stopperBaseLeft, stopperBaseRight, nail];
};
