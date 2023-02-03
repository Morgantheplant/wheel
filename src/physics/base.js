import { Engine, Render, Runner, Composite, Body } from "matter-js";
import { updatePosition } from "../store/slice";
import { HEIGHT, PEG_COUNT, STOPPER_HEIGHT, STOPPER_WIDTH, WHEEL_RADIUS, WIDTH } from "../settings";
import { createStopperEntities } from "./createStopperEntities";
import { createWheelEntities } from "./createWheelEntities";
import { createPegEntities } from "./createPegEntities";
import { createMouseEntities } from "./createMouseEntities";

export const initPhysics = (store) => {
  const engine = Engine.create();

  const screenWidth = WIDTH;
  const screenHeight = HEIGHT;

  // create a renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: screenWidth,
      height: screenHeight,
    },
  });

  // collision filtering between pegs/wheel
  const wheelGroup = Body.nextGroup(true);
  // collision category between stopper and pegs
  const pegStopperCategory = 0x0001;
  // collision category between mouse and wheel
  const wheelMouse = 0x0002;

  const wheelCenterX = screenWidth / 2;
  const stopperY = 90;

  const wheelEntities = createWheelEntities({
    wheelCenterX: screenWidth / 2,
    wheelCenterY: WHEEL_RADIUS + stopperY + 10,
    wheelRadius: WHEEL_RADIUS,
    collisionFilter: {
      group: wheelGroup,
      category: wheelMouse,
    },
  });

  const stopperEntities = createStopperEntities({
    stopperX: wheelCenterX,
    stopperY: 90,
    stopperHeight: 6,
    stopperWidth: 40,
    stopperCollisionFilter: {
        group: wheelGroup,
        mask: pegStopperCategory,
      }
  });

  const pegEntities = createPegEntities({
    pegCount: PEG_COUNT,
    wheelRadius: WHEEL_RADIUS,
    offset: 10,
    collisionFilterMask: pegStopperCategory,
    wheel: wheelEntities[0]
  });

  const mouseEntities = createMouseEntities({
    engine,
    collisionFilterMask: wheelMouse | pegStopperCategory,
    render,
  });

  // todo: remove forEach. ...spread syntax not working
  [
    wheelEntities,
    stopperEntities,
    pegEntities,
    mouseEntities
  ].forEach(entityGroup=>{
    // add all of the bodies to the world
    Composite.add(engine.world, entityGroup);
  })

  
  
    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
  
  const loop = () => {
    const bodies = Composite.allBodies(engine.world);
    store.dispatch(updatePosition(bodies));
    requestAnimationFrame(loop)
  }
    
  loop()
};