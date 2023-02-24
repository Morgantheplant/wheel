import { getDecimal } from "./getDecimal";

// convert radian rotation value to degrees 
export const  radianRotationsToDegrees = (angle: number) => {
    const rotations = angle / (2 * Math.PI); // radian to rotations
    const degreeRotation = 360 * getDecimal(rotations);
    return degreeRotation > 0 ? 360 - degreeRotation : degreeRotation;
  };