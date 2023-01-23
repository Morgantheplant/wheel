import {Engine, Render, Runner, Bodies, Composite, Constraint, Mouse, MouseConstraint, Body } from "matter-js";


// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine
});


const wheelGroup = Body.nextGroup(true);
const WHEEL_RADIUS = 200
const pegStopperCategory = 0x0001
const wheelMouse = 0x0002
// create two boxes and a ground
const wheel = Bodies.circle(400, 200, WHEEL_RADIUS, {
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

const getXYCoords = (angle, radius, offset) => ({
    x: (radius - offset) * Math.sin(Math.PI * 2 * angle / 360),
    y: (radius - offset) * Math.cos(Math.PI * 2 * angle / 360)
});

const PEGS = 20
const stopperX = 400;
const stopper = Bodies.rectangle(stopperX, 90, 6, 40, {
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
    pointA: {x: 400, y: 90},
    pointB: {x: 0, y: -10},
    bodyB: stopper,
    length: 0,
    damping: 0.1,
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



const spinnerConstraint = Constraint.create({
    bodyA: wheel,
    pointA: {x: 0, y: 0 },
    pointB: { x: 400, y: 300 },
    length: 0,
    stiffness: 1
})


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