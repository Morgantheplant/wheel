export const setStyles = (el: HTMLElement | SVGElement, styles: CSSStyleDeclaration) => {
  Object.entries(styles).forEach(([key, value]) => {
    (<any>el.style)[key] = value;
  });
};
