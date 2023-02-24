import { WHEEL_OF_FORTUNE } from "../contants/bodies";
import { findBodyById } from "./findBodyById";

export const wheelSelector = findBodyById(WHEEL_OF_FORTUNE);

export const isWheelSpinning = (speed: number) => speed > 0.001;