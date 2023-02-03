import { Bodies, Constraint } from "matter-js";
import { selectPeg } from "../contants/bodies";

const getXYCoords = (angle, radius, offset) => ({
    x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
    y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
  });

export const createPegEntities = ({ pegCount, wheelRadius, offset, collisionFilterMask, wheel }) =>{
    const angle = 360 / pegCount;
    const pegEntities = Array.from({ length: pegCount }).reduce((acc, _, i) => {
        
        const peg = Bodies.circle(0, 0, 10, {
          collisionFilter: {
            mask: collisionFilterMask,
          },
          id: selectPeg(i),
        });

        const pegConstraint = Constraint.create({
          bodyA: wheel,
          pointA: getXYCoords(360 - i * angle, wheelRadius, offset || 10),
          pointB: { x: 0, y: 0 },
          length: 0,
          bodyB: peg,
        });
        acc.push(peg, pegConstraint);
        return acc;
      }, []);
    
      return pegEntities
} 
  