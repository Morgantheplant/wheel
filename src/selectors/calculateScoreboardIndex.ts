import { STOPPER } from "src/contants/bodies";
import { WheelState } from "src/store/wheelSlice";
import { findBodyById } from "./findBodyById";
import { getSliceCount } from "./getSliceCount";


// translate indices at start and end of circle
const circularIndexResolver = (total: number) => (index: number) => {
  switch (true) {
    case index >= total:
      return total - index;
    case index < 0:
      return total + index;
    default:
      return index;
  }
};


const radiansToDegrees = (angle:number) => angle * (180/Math.PI);
const degreesToAbsoluteAngle = (angle:number) => ((angle % 360) + 360) % 360;
const isOutsideOfThreshold = (threshold: number) =>   threshold > 0.8 || threshold < 0.2;

export const calculateScoreboardIndex = (angle: number, state: WheelState): number => {
  const sliceCount = getSliceCount(state);
  const angleSize = 360 /  sliceCount;
  const startPositionOffset = angleSize / 2;
  const angleInDegrees = degreesToAbsoluteAngle(radiansToDegrees(angle) + startPositionOffset)
  const rawIndex = Math.floor(angleInDegrees / angleSize)
  const index = rawIndex > 0 ? sliceCount - rawIndex : 0
  const threshold = (angleInDegrees / angleSize)  - rawIndex
  const shouldCheckStopper = isOutsideOfThreshold(threshold)
  const getIndexFromCircle = circularIndexResolver(sliceCount);
  const stopper = findBodyById(STOPPER)(state);
  if (shouldCheckStopper) {
    const stopperIsRight = stopper.angle < -0.5;
    if (stopperIsRight) {
      return getIndexFromCircle(index + 1);
    }
    const stopperIsLeft = stopper.angle > 0.5;
    if (stopperIsLeft) {
      return getIndexFromCircle(index - 1);
    } 
  }
  return index

};