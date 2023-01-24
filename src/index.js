import {Engine, Render, Runner, Bodies, Composite, Constraint, Mouse, MouseConstraint, Body } from "matter-js";




const init = () => {

const {innerWidth, innerHeight} = window;
const screenWidth = Math.max(innerWidth, 150);
const screenHeight = Math.max(innerHeight - 100, screenWidth)
const WHEEL_RADIUS = screenWidth / 3
// create an engine
const engine = Engine.create();
console.log(screenWidth)
// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: screenWidth,
    height: screenHeight,
    }
});


const wheelGroup = Body.nextGroup(true);

const pegStopperCategory = 0x0001
const wheelMouse = 0x0002

const wheelCenterX = screenWidth / 2
const stopperX = wheelCenterX
const stopperY = 90;
const wheelCenterY = WHEEL_RADIUS + stopperY + 10

const getXYCoords = (angle, radius, offset) => ({
    x: (radius - offset) * Math.sin(Math.PI * 2 * angle / 360),
    y: (radius - offset) * Math.cos(Math.PI * 2 * angle / 360)
});

const PEGS = 20

const stopper = Bodies.rectangle(stopperX, stopperY, 6, 40, {
    collisionFilter: {
        group: wheelGroup,
        mask: pegStopperCategory,
    }
})
const stopperBaseLeft = Bodies.rectangle(stopperX - 30, 75, 40, 40, { 
    isStatic: true,
});
const stopperBaseRight = Bodies.rectangle(stopperX + 30, 75, 40, 40, { 
isStatic: true,
});
const nail = Constraint.create({
    pointA: {x: wheelCenterX, y: 90},
    pointB: {x: 0, y: -10},
    bodyB: stopper,
    length: 0,
    damping: 0.1,
    stiffness: 1
})




const wheel = Bodies.circle(wheelCenterX, wheelCenterY, WHEEL_RADIUS, {
    collisionFilter: {
        group: wheelGroup,
        category: wheelMouse
    },
    render: {
        strokeStyle: '#ffffff',
        sprite: {
            texture: './wheel.png'
        }
    }
});

const spinnerConstraint = Constraint.create({
    bodyA: wheel,
    pointA: {x: 0, y: 0 },
    pointB: { x: wheelCenterX, y: wheelCenterY },
    length: 0,
    stiffness: 1
})


const angle = 360 / PEGS
const entities = Array.from({length: PEGS }).map((_, i)=>{
    const peg = Bodies.circle(0 , 0, 10, {
        collisionFilter: {
            mask: pegStopperCategory,
            // group: wheelGroup
        }
    });
    const pegConstraint = Constraint.create({
        bodyA: wheel,
        pointA: getXYCoords(360 - (i * angle), WHEEL_RADIUS, 10),
        pointB: { x: 0, y: 0 },
        length: 0,
        bodyB: peg,
    })
    return [peg, pegConstraint]
}).flat()

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            // allow bodies on mouse to rotate
            angularStiffness: 0,
            render: {
                visible: true
            }
        }
    });

// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
Composite.add(engine.world, [wheel, spinnerConstraint, stopperBaseLeft, stopperBaseRight, mouseConstraint, nail, stopper, ...entities]);

mouseConstraint.collisionFilter.mask = wheelMouse | pegStopperCategory

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

}


document.addEventListener("DOMContentLoaded", init);