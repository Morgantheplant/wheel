import _render from "packages/render";
import { calculateScoreboardIndex } from "src/selectors/calculateScoreboardIndex";
import { isWheelSpinning, wheelSelector } from "../../selectors/wheelSelector";
import { WheelState } from "../../store/wheelSlice";

const scoreboardTransform = (state: WheelState) => {
  const { angularSpeed, angle } = wheelSelector(state);
  const index = calculateScoreboardIndex(angle, state);
  const value = (state.slices && state.slices[index]?.text) || index;
  return {
    textContent: isWheelSpinning(angularSpeed)
      ? `${value}`
      : `You selected: ${value}`,
  };
};

const scoreboardSelector = (state: WheelState) => state;

export const Scoreboard = () => {
  return (
    <section
      style={{
        backgroundColor: "black",
        border: "2px solid rgb(60,60,60)",
        borderRadius: "5px",
        bottom: "10px",
        color: "white",
        fontFamily: "'Alfa Slab One', verdana",
        height: "80px",
        left: "50%",
        padding: "5px 20px",
        position: "absolute",
        textAlign: "center",
        textShadow: [
          "0 0 2px black",
          "0 0 7px #bdff9f",
          "0 0 10px #bdff9f",
          "0 0 21px #bdff9f",
          "0 0 36px #bdff9f",
        ].join(", "),
        transform: "translate(-50%)",
        width: "150px",
      }}
    >
      <p connect={scoreboardTransform} selector={scoreboardSelector} />
    </section>
  );
};
