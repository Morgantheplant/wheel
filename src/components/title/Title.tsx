import _render, { setStyles } from "packages/render";
import { sleep } from "src/utils/sleep";

const setScale = (element: HTMLElement, scale: number) =>
  setStyles(element, {
    transform: `scale(${scale}, ${scale})`,
  } as CSSStyleDeclaration);

const TITLE_GROW_SCALE = 1.5;
const TITLE_DEFAULT_SCALE = 1;
const TITLE_SCALE_TIME_MS = 800;

const introAnimation = async (element: HTMLElement | null, index: number) => {
  if (!element) return;
  await sleep((index + 1) * TITLE_SCALE_TIME_MS);
  setScale(element, TITLE_GROW_SCALE);
  await sleep(TITLE_SCALE_TIME_MS);
  setScale(element, TITLE_DEFAULT_SCALE);
};

export const Title = ({ children }: { children: string }) => {
  return (
    <h1
      className="main__title"
      style={{
        color: "white",
        fontFamily: "Passion One, verdana, sans-serif",
        position: "absolute",
        top: "20px",
        left: "40px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {children &&
        children[0].split(" ").map((child, i) => {
          return (
            <span
              style={{
                display: "inline-block",
                transition: `transform ${TITLE_SCALE_TIME_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                cursor: "pointer",
                textShadow: "2px 2px 2px black",
                paddingRight: "10px",
              }}
              ref={(ref) => introAnimation(ref, i)}
              onMouseEnter={(e) => {
                setScale(e.target as HTMLElement, TITLE_GROW_SCALE);
              }}
              onMouseLeave={(e) => {
                setScale(e.target as HTMLElement, TITLE_DEFAULT_SCALE);
              }}
            >
              {child}
            </span>
          );
        })}
    </h1>
  );
};
