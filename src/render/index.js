import { memo } from "./memoTransform.js";
import { setAttributes } from "./setAttributes.js";

const svgns = "http://www.w3.org/2000/svg";
const svgElements = new Set([
  "rect",
  "circle",
  "svg",
  "polyline",
  "polygon",
  "ellipse",
  "path",
  "defs",
  "linearGradient",
  "stop",
  "g",
  "text",
  "filter",
  "feGaussianBlur"
]);

export const createElement = (() => {
  const state = {
    handlers: [],
  };
  return (component, attributes, children) => {
    if (typeof component === "function") return component(attributes, children);
    if (component == "fragment") return children;
    const $element = svgElements.has(component)
      ? document.createElementNS(svgns, component)
      : document.createElement(component || "div");

    if (attributes) {
      const {
        store,
        selector,
        attributeTransform,
        ...restAttributes
      } = attributes;
      // initial styles

      // set all other attributes
      setAttributes($element, restAttributes);

      //initilize handlers
      if (selector || attributeTransform) {
        
        // memoize transform calls so only changes applies
        const transformMemo = memo(attributeTransform);

        const handler = (state) => {
          const selection = selector ? selector(state) : state;
         if(attributeTransform){
          const attributeUpdates = transformMemo(selection);  
          attributeUpdates && setAttributes($element, attributeUpdates);
         }
          
        };
        state.handlers.push(handler);
      }

      state.store = state.store || store;

      // subscribe handlers
      while (state.store && state.handlers.length) {
        store.subscribe(state.handlers.pop());
      }

      // initialize store (store should only be added 1x in tree)
      if (store) {
        state.store.dispatch({ type: "@@INIT" });
        window.dispatch = state.store.dispatch;
      }
    }

    if (children) {
      const handleChildren = (child) => {
        if (typeof child === "string") {
          // handle svg text element
          if(component === "text"){
            $element.textContent = child
            return;
          }
          // avoid setting text nodes on other svg elements
          if (svgElements.has(component)) return;
          const textnode = document.createTextNode(child);
          $element.appendChild(textnode);
          return;
        }
        if (Array.isArray(child)) {
          child.forEach(handleChildren);
          return;
        }

        $element.appendChild(child);
      };
      state.children = Array.isArray(children) ? children : [children];
      state.children.forEach(handleChildren);
    }

    return $element;
  };
})();

export default { createElement };
