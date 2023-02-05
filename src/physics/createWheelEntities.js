import { Bodies, Constraint } from "matter-js";
import { WHEEL_OF_FORTUNE } from "../contants/bodies";

export const createWheelEntities = ({
  wheelCenterX,
  wheelCenterY,
  wheelRadius,
  collisionFilter,
}) => {
  const wheel = Bodies.circle(wheelCenterX, wheelCenterY, wheelRadius, {
    collisionFilter,
    id: WHEEL_OF_FORTUNE,
    restitution: 1,
  });

  wheel.initialRadius = wheelRadius;
  wheel.initialX = wheelCenterX;
  wheel.initialY = wheelCenterY;

  const spinnerConstraint = Constraint.create({
    bodyB: wheel,
    pointA: { x: wheelCenterX, y: wheelCenterY },
    pointB: { x: 0, y: 0 },
    length: 0,
    stiffness: 1,
  });

  return [wheel, spinnerConstraint];
};
