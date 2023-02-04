import { STOPPER, STOPPER_LEFT, STOPPER_RIGHT } from '../../contants/bodies'
import _render from '../../render'
import { findBodyById } from '../../selectors/findBodyById'

const stopperSelector = findBodyById(STOPPER)
const stopperLeftSelector = findBodyById(STOPPER_LEFT)
const stopperRightSelector = findBodyById(STOPPER_RIGHT)

const rectTransform = (body = {}) => {
  return {
    height: body.initialHeight,
    width: body.initialWidth,
    x: body.position.x - (body.initialWidth/2),
    y: body.position.y - (body.initialWidth/2),
    style: {
      "fill": "brown",
      transform: `rotate(${body.angle}rad)`,
      "transform-origin": "top left",
      "transform-box": "fill-box",
    }
  }
}

const toPoints = (values) => values.map(item=>item.join(" ")).join(",")
const createStopperTrianglePoints = (body) => {
  const width = body.initialHeight; // todo: fix this it is switched
  const height = body.initialWidth;
  const x = body.position.x - (width/2)
  const y = body.position.y - (height/2)
  // end of stopper padding so collision doesnt appear to overlap
  const paddingBottom = 5; 
  const topLeft = [x, y]
  const bottom = [x + width / 2, y + height - paddingBottom]
  const topRight = [x + width, y]
  return toPoints([topLeft, bottom, topRight])
}
const stopperTransform = (body) => ({
    points: createStopperTrianglePoints(body),
    style: {
       transform: `rotate(${body.angle}rad)`,
      "transform-origin": "4px 20px",
      "transform-box": "fill-box",
      "stroke-linejoin": "round",
      "stroke-width": "3px"
    }
  })

export const Stopper = () => {
  return (
    <fragment>
      <rect
        stroke="brown" 
        selector={stopperLeftSelector} attributeTransform={rectTransform} />
      <rect
        stroke="brown"
        selector={stopperRightSelector}
        attributeTransform={rectTransform}
      />
      <polygon 
       fill="orange"
       stroke="orange"
       selector={stopperSelector} attributeTransform={stopperTransform} />
    </fragment>
  )
}
