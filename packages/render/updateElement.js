import { supportsPassive } from "../../src/utils/supportsPassive";
import {setStyles} from './setStyles';

// attributes with "on" prefix are events
const isEvent = (attribute) => attribute.startsWith("on");
// remove the fist two "on" characters and lowercase for DOM event name
const formatEventName = (event) => event.slice(2, event.length).toLowerCase();

export const updateElement = (element, { style, className, ...attributes }) => {
  if (style) {
    setStyles(element, style);
  }

  Object.entries({ ...attributes, class: className }).forEach(
    ([attribute, value]) => {
      // ignore empty values
      if (!value) return;

      // set event handlers
      if (isEvent(attribute)) {
        element.addEventListener(formatEventName(attribute), value,  supportsPassive ? { passive: true } : false);
        return;
      }
      // set text value
      if (attribute === "textContent") {
        element.textContent = value;
        return;
      }
      element.setAttribute(attribute, value);
    }
  );
};
