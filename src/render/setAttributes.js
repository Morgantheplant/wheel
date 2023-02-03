import { setStyles } from "./setStyles";

export const setAttributes = (el, {className, style, ...attributes}) => {
  if(style){
    setStyles(el, style)
  }
  Object.entries({ ...attributes, class: className }).forEach(
    ([attribute, value]) => {
      value && el.setAttribute(attribute, value);
    }
  );
};
