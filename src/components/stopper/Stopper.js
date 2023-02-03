import { STOPPER, STOPPER_LEFT, STOPPER_RIGHT } from '../../contants/bodies'
import _render from '../../render'
import { findBodyById } from '../../selectors/findBodyById'

const stopperSelector = findBodyById(STOPPER)
const stopperLeftSelector = findBodyById(STOPPER_LEFT)
const stopperRightSelector = findBodyById(STOPPER_RIGHT)

const rectTransform = (height, width) => (body = {}) => {
  return {
    x: body.position.x - (width/2),
    y: body.position.y - (height/2),
    style: {
      transform: `rotate(${body.angle}rad)`,
      "transform-origin": "top left",
      "transform-box": "fill-box",
    }
  }
}

const stopperTransform = (height, width) => (body) => ({
    x: body.position.x - (height/2),
    y: body.position.y - (width/2),
    style: {
       transform: `rotate(${body.angle}rad)`,
      "transform-origin": "4px 20px",
      "transform-box": "fill-box",
    }
  })

export const Stopper = () => {
  return (
    <fragment>
      <rect
       width={40}
       height={40}
        stroke="black" 
        selector={stopperLeftSelector} attributeTransform={rectTransform(40, 40)} />
      <rect
        width={40}
        height={40}
        stroke="black"
        selector={stopperRightSelector}
        attributeTransform={rectTransform(40, 40)}
      />
      <rect 
       width={6}
       height={40}
       stroke="yellow"
       selector={stopperSelector} attributeTransform={stopperTransform(6, 40)} />
    </fragment>
  )
}
