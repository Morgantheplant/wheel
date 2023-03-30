import { STOPPER } from "src/contants/bodies";
import { WheelState } from "src/store/wheelSlice";
import { findBodyById } from "./findBodyById";


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
const isOutsideOfThreshold = (threshold: number) =>   threshold > 0.85 || threshold < 0.2;

export const calculateScoreboardIndex = (angle: number, state: WheelState): number => {
  const angleSize = 360 /  state.sliceCount;
  const startPositionOffset = angleSize / 2;
  const angleInDegrees = degreesToAbsoluteAngle(radiansToDegrees(angle) + startPositionOffset)
  const rawIndex = Math.floor(angleInDegrees / angleSize)
  const index = rawIndex > 0 ? state.sliceCount - rawIndex : 0
  const threshold = (angleInDegrees / angleSize)  - rawIndex
  const shouldCheckStopper = isOutsideOfThreshold(threshold)
  const getIndexFromCircle = circularIndexResolver(state.sliceCount);
  if (shouldCheckStopper) {
    const stopper = findBodyById(STOPPER)(state);
    const stopperIsRight = stopper.angle < -0.01;
    if (stopperIsRight) {
      return getIndexFromCircle(index + 1);
    }
    const stopperIsLeft = stopper.angle > 0.02;
    if (stopperIsLeft) {
      return getIndexFromCircle(index - 1);
    }
  }
  return index

};