import { Bodies, Constraint } from "matter-js";
import { WHEEL_OF_FORTUNE } from "../contants/bodies";

export const createWheelEntities = ({
  wheelCenterX,
  wheelCenterY,
  wheelRadius,
  collisionFilter,
}: {
  wheelCenterX: number,
  wheelCenterY: number,
  wheelRadius: number,
  collisionFilter: Matter.ICollisionFilter,
}) => {
  const wheel = Bodies.circle(wheelCenterX, wheelCenterY, wheelRadius, {
    collisionFilter,
    label: WHEEL_OF_FORTUNE,
    restitution: 1,
    plugin: {
      initialRadius: wheelRadius,     
      initialXPosition: wheelCenterX,
      initialYPosition:  wheelCenterY
    }
  });

 

  const spinnerConstraint = Constraint.create({
    bodyB: wheel,
    pointA: { x: wheelCenterX, y: wheelCenterY },
    pointB: { x: 0, y: 0 },
    length: 0,
    stiffness: 1,
  });

  return [wheel, spinnerConstraint];
};
