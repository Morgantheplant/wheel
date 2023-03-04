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
        position: "absolute",
        fontFamily: "'Alfa Slab One', verdana",
        padding: "5px 20px",
        border: "2px solid rgb(60,60,60)",
        width: '150px',
        height: '80px',
        textAlign: "center", 
        borderRadius: "5px",
        bottom: "10px",
        left: "50%",
        transform: 'translate(-50%)',
        zIndex: "1000",
        color: "white",
        textShadow: [
          "0 0 2px black",
          "0 0 7px #bdff9f",
          "0 0 10px #bdff9f",
          "0 0 21px #bdff9f",
          "0 0 36px #bdff9f",
        ].join(", "),
        backgroundColor: "black",        
      }}
    >
      <p selector={scoreboardSelector} connect={scoreboardTransform} />
    </section>
  );
};
