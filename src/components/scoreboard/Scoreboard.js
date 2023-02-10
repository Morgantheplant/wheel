import _render from "_render";
import { wheelSelector } from "../../selectors/wheelSelector";

const scoreboardTransform = (state)=>{
    if(state.spinStatus === state.IDLE) return {}
    const {angularSpeed, angle } = wheelSelector(state);
    return {
        textContent: angularSpeed > 0.001 ? `spinning ${angle} speed: ${angularSpeed}` : `stopped at ${angle}`
    }
}

export const Scoreboard = () => {
    return <section>
        <h4 selector={state=> state} connect={scoreboardTransform} />
    </section>
}