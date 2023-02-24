import { STOPPER } from "src/contants/bodies";
import { WheelState } from "src/store/slice";
import { radianRotationsToDegrees } from "src/utils/radianRotationsToDegrees";
import { findBodyById } from "./findBodyById";

const getAngleWithOffset = (angle: number, offset: number) => {
  const angleWithOffset = radianRotationsToDegrees(angle) - offset;
  // translate to value between 0 and 360
  return angleWithOffset > 360
    ? 360 - angleWithOffset
    : angleWithOffset < 0
    ? 360 + angleWithOffset
    : angleWithOffset;
};

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

const calculatePosition = (angle: number, count: number) => {
  const angleSize = 360 / count;
  const startPositionOffset = angleSize / 2;
  return getAngleWithOffset(angle, startPositionOffset) / angleSize;
};

const findIndexFromPosition = (
  position: number
): { index: number; shouldCheckStopper: boolean } => {
  const index = 12 - Math.ceil(position);
  const difference = 12 - position - index;
  const shouldCheckStopper = difference > 0.85 || difference < 0.2;
  return {
    index,
    shouldCheckStopper,
  };
};


export const calculateScoreboardIndex = (angle: number, state: WheelState): number => {
  const currentPosition = calculatePosition(angle, state.sliceCount);
  const { index, shouldCheckStopper } = findIndexFromPosition(currentPosition);
  const getIndexFromCircle = circularIndexResolver(state.sliceCount);
  if (shouldCheckStopper) {
    const stopper = findBodyById(STOPPER)(state);
    const stopperIsRight = stopper.angle < -0.01;
    if (stopperIsRight) {
      return getIndexFromCircle(index - 1);
    }
    const stopperIsLeft = stopper.angle > 0.02;
    if (stopperIsLeft) {
      return getIndexFromCircle(index + 1);
    }
  }
  return getIndexFromCircle(index);
};