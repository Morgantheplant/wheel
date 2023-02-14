import { isFunction } from "../../src/utils/isFunction";
import { supportsPassive } from "../../src/utils/supportsPassive";
import {setStyles} from './setStyles';
import { ElementAttributes } from "./types";

// attributes with "on" prefix are events
const isEvent = (attribute: string) => attribute.startsWith("on");
// remove the fist two "on" characters and lowercase for DOM event name
const formatEventName = (event: string) => event.slice(2, event.length).toLowerCase();

export const updateElement = (element: HTMLElement | SVGElement, { style, className, ...attributes }: ElementAttributes) => {
  
  if (style) {
    setStyles(element, style);
  }

  Object.entries({ ...attributes, class: className }).forEach(
    ([attribute, value]) => {
      // ignore empty values
      if (!value) return;

      // set event handlers
      if (isEvent(attribute)) {
        if (!isFunction(value)) throw Error(`Event handler must use a function. ${element.tagName} ${attribute} ${value}`)
        element.addEventListener(formatEventName(attribute), value as EventListenerOrEventListenerObject,  supportsPassive() ? { passive: true } : false);
        return;
      }
      // set text value
      if (attribute === "textContent") {
        element.textContent = `${value}`;
        return;
      }
      element.setAttribute(attribute, `${value}`);
    }
  );
};
