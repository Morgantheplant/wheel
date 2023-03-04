import { PEG } from "../contants/bodies";
import { WheelState } from "../store/wheelSlice";

export const pegsSelector = ({bodies}: WheelState) => bodies.filter(body => body.label.startsWith(PEG))
