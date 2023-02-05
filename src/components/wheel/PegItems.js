import _render from "../../render";
import { Peg } from "./Peg";

export const PegItems = (props) => <fragment>
     {Array.from({ length: props.pegCount }).map((_, i) => {
        return <Peg key={i} />;
      })}
</fragment>

