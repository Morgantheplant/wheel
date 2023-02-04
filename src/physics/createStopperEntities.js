import { Bodies, Constraint } from "matter-js";
import { STOPPER, STOPPER_LEFT, STOPPER_RIGHT } from "../contants/bodies";


export const createStopperEntities = ({ stopperX, stopperY, stopperHeight, stopperWidth, stopperCollisionFilter }) => {
    const stopper = Bodies.rectangle(
        stopperX,
        stopperY,
        stopperHeight, // todo: these are incorrectly labeled (switch them)
        stopperWidth,
        {
          collisionFilter: stopperCollisionFilter,
          id: STOPPER,
        }
      );
      stopper.initialHeight = stopperHeight
      stopper.initialWidth = stopperWidth
      const stopperBase = 40;
      const stopperBaseLeft = Bodies.rectangle(stopperX - 30, 75, stopperBase, stopperBase, {
        isStatic: true,
        id: STOPPER_LEFT,
      });
      stopperBaseLeft.initialHeight = stopperBase;
      stopperBaseLeft.initialWidth = stopperBase;
      const stopperBaseRight = Bodies.rectangle(stopperX + 30, 75, stopperBase, stopperBase, {
        isStatic: true,
        id: STOPPER_RIGHT,
      });
      stopperBaseRight.initialHeight = stopperBase;
      stopperBaseRight.initialWidth = stopperBase;

     
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