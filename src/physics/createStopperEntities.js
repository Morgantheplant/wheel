import { Bodies, Constraint } from "matter-js";
import { STOPPER, STOPPER_LEFT, STOPPER_RIGHT } from "../contants/bodies";


export const createStopperEntities = ({ stopperX, stopperY, stopperHeight, stopperWidth, stopperCollisionFilter }) => {
    const stopper = Bodies.rectangle(
        stopperX,
        stopperY,
        stopperHeight,
        stopperWidth,
        {
          collisionFilter: stopperCollisionFilter,
          id: STOPPER,
        }
      );
      const stopperBaseLeft = Bodies.rectangle(stopperX - 30, 75, 40, 40, {
        isStatic: true,
        id: STOPPER_LEFT,
      });
      const stopperBaseRight = Bodies.rectangle(stopperX + 30, 75, 40, 40, {
        isStatic: true,
        id: STOPPER_RIGHT,
      });
    
      const nail = Constraint.create({
        pointA: { x: stopperX, y: stopperY },
        pointB: { x: 0, y: -10 },
        bodyB: stopper,
        length: 0,
        damping: 0.1,
        stiffness: 1,
      });
    return [stopper, stopperBaseLeft, stopperBaseRight, nail]
}