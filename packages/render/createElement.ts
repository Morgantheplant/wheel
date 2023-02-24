import { connectStore } from './connectStore.js'
import { updateElement } from './updateElement.js'
import { Component, Props, State } from './types.js'
import { svgElements, svgns } from './constants.js'
import { ReactNode } from 'react';

export const createElement = (() => {
  let state:  State = { handlers: [], store: null }
  return (component: string | Component, props: Props, ...children: ReactNode[]) => {
    // handle custom components
    if (typeof component === 'function') return component({ ...props, children })
    // handle fragments
    if (component == 'fragment') return children

    // create dom or svg element
    const $element = svgElements.has(component)
      ? document.createElementNS(svgns, component)
      : document.createElement(component || 'div')

    if (props) {
      // set DOM/SVG attributes, events and textContent
      const { store, selector, connect, ref, ...restProps } = props
      updateElement($element, restProps)
      ref && ref($element)
      //connects app/handlers to store
      const connectedStore = connectStore({
        element: $element,
        elementProps: props,
        store: (state.store || store || null) ,
        handlers: state.handlers,
      })
      state = {
        ...state,
        ...connectedStore
      }
    }

    if (children) {
      const handleChildren = (child: ReactNode) => {
        // todo: recurse here
        if (typeof child === 'string') {
          // handle svg text element
          if (component === 'text') {
            $element.textContent = child
            return
          }
          // avoid setting text nodes on other svg elements
          if (svgElements.has(component)) return
          const textnode = document.createTextNode(child)
          $element.appendChild(textnode)
          return
        }
        if (Array.isArray(child)) {
          child.forEach(handleChildren)
          return
        }
        
        $element.appendChild(child as any)
      }
      
      children.forEach(handleChildren)
    }

    return $element
  }
})();
