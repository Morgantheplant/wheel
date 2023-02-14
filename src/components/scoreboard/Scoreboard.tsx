import _render from "packages/render";
import { SPIN_STATUS } from "../../contants/wheel";
import { wheelSelector } from "../../selectors/wheelSelector";
import { WheelState } from "../../store/slice";

const scoreboardTransform = (state: WheelState) => {
  // if (state.spinStatus === SPIN_STATUS.IDLE) return {};
  const { angularSpeed, angle } = wheelSelector(state);
  return {
    textContent:
      angularSpeed > 0.001
        ? `spinning ${angle} speed: ${angularSpeed}`
        : `stopped at ${angle}`,
  };
};

const scoreboardSelector = (state: WheelState) => state 

export const Scoreboard = () => {
  return (
    <section>
       <h4 selector={scoreboardSelector} connect={scoreboardTransform} />
    </section>
  );
};
