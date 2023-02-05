import { Bodies, Constraint } from "matter-js";
import { selectPeg } from "../contants/bodies";

const getXYCoords = (angle, radius, offset) => ({
    x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
    y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
  });

export const createPegEntities = ({ pegCount, wheelRadius, offset, collisionFilterMask, wheel }) =>{
    const angle = 360 / pegCount;
    
    const pegEntities = Array.from({ length: pegCount }).reduce((acc, _, i) => {
      const coords = getXYCoords(360 - i * angle, wheelRadius, offset || 10)
        const peg = Bodies.circle(coords.x, coords.y, 5, {
          collisionFilter: {
            mask: collisionFilterMask,
          },
          id: selectPeg(i),

        });

        peg.initialXPosition = coords.x
        peg.initialYPosition = coords.y

        const pegConstraint = Constraint.create({
          bodyA: wheel,
          pointA: coords,
          pointB: { x: 0, y: 0 },
          length: 0,
          bodyB: peg,
        });
        acc.push(peg, pegConstraint);
        return acc;
      }, []);
    
      return pegEntities
} 
  