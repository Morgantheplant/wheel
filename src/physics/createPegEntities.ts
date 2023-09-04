import { Bodies, Constraint } from "matter-js";
import { selectPeg } from "../contants/bodies";

const getXYCoords = (angle: number, radius: number, offset: number) => ({
  x: (radius - offset) * Math.sin((Math.PI * 2 * angle) / 360),
  y: (radius - offset) * Math.cos((Math.PI * 2 * angle) / 360),
});

export const createPegEntities = ({
  pegCount,
  wheelRadius,
  offset,
  collisionFilterMask,
  wheel,
}: {
  pegCount: number;
  wheelRadius: number;
  offset: number;
  collisionFilterMask: number;
  wheel: Matter.Body;
}) => {
  const angle = 360 / pegCount;

  const pegEntities = Array.from({ length: pegCount }).reduce<
    Array<Matter.Body | Constraint>
  >((acc, _, i) => {
    const coords = getXYCoords(360 - i * angle, wheelRadius, offset || 10);
    const peg = Bodies.circle(coords.x, coords.y, 5, {
      collisionFilter: {
        mask: collisionFilterMask,
      },
      label: selectPeg(i),
      plugin: {
        initialXPosition: coords.x,
        initialYPosition: coords.y,
      },
      density: 0.5
    });

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

  return pegEntities;
};
