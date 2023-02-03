import { Bodies, Constraint } from "matter-js";
import { WHEEL_OF_FORTUNE } from "../contants/bodies";

export const createWheelEntities = ({wheelCenterX, wheelCenterY, wheelRadius, collisionFilter }) => {

    const wheel = Bodies.circle(wheelCenterX, wheelCenterY, wheelRadius, {
      collisionFilter,
      id: WHEEL_OF_FORTUNE,
    });
  
    const spinnerConstraint = Constraint.create({
      bodyA: wheel,
      pointA: { x: 0, y: 0 },
      pointB: { x: wheelCenterX, y: wheelCenterY },
      length: 0,
      stiffness: 1,
    });
  
    return [wheel, spinnerConstraint]
  };