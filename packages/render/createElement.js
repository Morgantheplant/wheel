import { connectStore } from './connectStore.js'
import { updateElement } from './updateElement.js'

const svgns = 'http://www.w3.org/2000/svg'
const svgElements = new Set([
  'rect',
  'circle',
  'svg',
  'polyline',
  'polygon',
  'ellipse',
  'path',
  'defs',
  'linearGradient',
  'stop',
  'g',
  'text',
  'filter',
  'feGaussianBlur',
])

export const createElement = (() => {
  const state = { handlers: [] }
  return (component, props, children) => {
    // handle custom components
    if (typeof component === 'function') return component(props, children)
    // handle fragments
    if (component == 'fragment') return children

    // create dom or svg element
    const $element = svgElements.has(component)
      ? document.createElementNS(svgns, component)
      : document.createElement(component || 'div')

    // set DOM/SVG attributes, events and textContent
    if (props) {
      const { store, selector, connect, ...restProps } = props
      updateElement($element, restProps)

      //connects app/handlers to store
      const connectedStore = connectStore({
        element: $element,
        elementProps: {
          selector,
          connect,
          props: restProps,
        },
        store: state.store || store,
        handlers: state.handlers,
      })
      state.store = connectedStore.store
      state.handlers = connectedStore.handlers
    }

    if (children) {
      const handleChildren = (child) => {
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

        $element.appendChild(child)
      }
      state.children = Array.isArray(children) ? children : [children]
      state.children.forEach(handleChildren)
    }

    return $element
  }
})();
