export const setStyles = (el, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    el.style[key] = value;
  });
};
