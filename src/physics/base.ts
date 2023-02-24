import {
  Engine,
  Runner,
  Composite,
  Body,
  Events,
} from "matter-js";
import { updatePosition, WheelState, WheelAction } from "../store/slice";
import {  PEG_COUNT, WHEEL_RADIUS } from "../settings";
import { createStopperEntities } from "./createStopperEntities";
import { createWheelEntities } from "./createWheelEntities";
import { createPegEntities } from "./createPegEntities";
import { createMouseEntities } from "./createMouseEntities";
import { createStore } from "../../packages/store/createStore";
import { createDebugger } from "./createDebugger";

export const initPhysics = <S extends object, A extends object>(
  store: ReturnType<typeof createStore<WheelState, WheelAction>>,
  options?: { debug: boolean }
) => {
  const engine = Engine.create();
  const { height, width } = store.getState();
  const screenWidth = width;
  const screenHeight = height;

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
    stopperHeight: 44,
    stopperWidth: 8,
    stopperCollisionFilter: {
      group: wheelGroup,
      mask: pegStopperCategory,
    },
  });

  const pegEntities = createPegEntities({
    pegCount: PEG_COUNT,
    wheelRadius: WHEEL_RADIUS,
    offset: 10,
    collisionFilterMask: pegStopperCategory,
    wheel: wheelEntities[0],
  });

  const mouseEntities = createMouseEntities({
    engine,
    collisionFilterMask: wheelMouse | pegStopperCategory,
  });

  // todo: remove forEach. ...spread syntax not working
  [wheelEntities, stopperEntities, pegEntities, mouseEntities].forEach(
    (entityGroup) => {
      // add all of the bodies to the world
      Composite.add(engine.world, entityGroup as Matter.Body[]);
    }
  );

  if (options?.debug) {
    createDebugger({
      engine,
      mouse: mouseEntities[0],
      screenHeight,
      screenWidth,
    });
  }

  // dispatch DOM updates
  const updateDOM = () => {
    const bodies = Composite.allBodies(engine.world);
    store.dispatch(updatePosition(bodies));
  };

  // update initial state
  updateDOM();

  // create runner
  const runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  // update DOM on each tick
  Events.on(runner, "afterTick", updateDOM);
};
