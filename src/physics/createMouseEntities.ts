import { Engine, Mouse, MouseConstraint, Render } from "matter-js";

export const createMouseEntities = ({
  engine,
  collisionFilterMask,
}: {
  engine: Engine;
  collisionFilterMask: number;
}): [Mouse, MouseConstraint] => {
  const mouse: any = Mouse.create(document.body);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      angularStiffness: 0, // not added to types
      render: {
        visible: true,
      },
    } as Matter.IConstraintDefinition,
  });
  Mouse.clearSourceEvents(mouse);
  // // https://github.com/liabru/matter-js/issues/84
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);

  const events = {
    touchmove: mouse.mousemove,
    touchstart: mouse.mousedown,
    touchend: mouse.mouseup,
    mousemove: mouse.mousemove,
    mousedown: mouse.mousedown,
    mouseup: mouse.mouseup,
  };
  // monkey patch preventDefault to avoid runtime error in Chrome
  Object.entries(events).forEach(([eventName, eventHandler])=>{
    mouse.element.removeEventListener(eventName, eventHandler);
    mouse.element.addEventListener(eventName, (e: any) => {
        e.preventDefault = () => {};
        eventHandler(e);
      });
  })
  
  mouseConstraint.collisionFilter.mask = collisionFilterMask;
  return [mouse, mouseConstraint];
};
