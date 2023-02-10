import { PEG } from "../contants/bodies";

export const pegsSelector = ({bodies}) => bodies.filter(body => body.id.startsWith(PEG))
