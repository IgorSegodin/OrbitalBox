import {fabric} from 'fabric';

import objectTransformer from 'fabric/objectTransformer';
import canvasListener from 'game/input/canvasListener';
import inputListener from 'game/input/inputListener';
import InputState from 'game/input/InputState';
import Point from 'game/math/Point';

import simulateInput from 'game/simulation/simulateInput';
import simulateTranslation from 'game/simulation/simulateTranslation';
import simulateWorld from 'game/simulation/simulateWorld';
import Camera from 'game/world/Camera';
import generateWorld from 'game/world/generateWorld';
import InputActionMap from 'game/world/InputActionMap';
import Timer from 'game/world/Timer';

/**
 * @return {Array<Object>}
 */
function getInfoObjects({world, dT, targetObjectId}) {
    const lines = [];

    lines.push(`FPS: ${1000 / dT}`);

    if (targetObjectId) {
        world.objects.filter((o) => o.getId() === targetObjectId).forEach((o) => {
            lines.push(`Name: ${o.getName()}`);
            if (o.getPhysicsData()) {
                if (o.getPhysicsData().getVelocity()) {
                    lines.push(`V: ${o.getPhysicsData().getVelocity().getValue().toFixed(2)} m/s`);
                }
                if (o.getPhysicsData().getMass()) {
                    lines.push(`M: ${(o.getPhysicsData().getMass() * Math.pow(10, -20)).toFixed(0)} x 10^20 kg`);
                }
            }
        });
    }

    const infoText = new fabric.Text(lines.join("\r\n"), {
        fontWeight: 'bold',
        fill: `white`,
        fontFamily: 'Arial',
        fontSize: 12,
        left: 0,
        top: 0
    });

    return [infoText];
}

function processTick({canvas, objectTransformer, world, inputActionMap, camera, dT, timeMultiplier, targetObjectId}) {
    simulateWorld(world, dT * timeMultiplier);

    simulateInput({
        inputActionMap,
        camera,
        dT,
        world,
        targetObjectId
    });

    // TODO filter, render only visible objects
    const objectsToRender = world.objects;

    objectsToRender.forEach((o) => {
        canvas.add(
            objectTransformer.transform({
                objectData: o,
                camera
            })
        );
    });

    getInfoObjects({world, dT, targetObjectId}).forEach((o) => {
        canvas.add(o);
    });
}

class Game {

    constructor({canvasEl}) {
        this.timeMultiplier = 1;
        this.cameraZoom = 1;
        this.targetObjectId = null;

        this.canvas = new fabric.StaticCanvas(canvasEl);
        this.canvas.selection = false;

        this.canvasRenderProps = {
            backgroundColor: "black"
        };

        this.canvas.setHeight(canvasEl.parentNode.clientHeight - 4);
        this.canvas.setWidth(canvasEl.parentNode.clientWidth - 4);
    }

    init({updateTargetObjectOptions}) {
        this.start({updateTargetObjectOptions});
    }

    start({updateTargetObjectOptions}) {
        Promise.all([
            objectTransformer.promise(),
            generateWorld()
        ]).then((values) => {
            const objectTransformer = values[0];
            const world = values[1];

            updateTargetObjectOptions(world.objects);

            this.clear();

            const inputState = new InputState();
            inputListener(inputState);
            canvasListener({canvas: this.canvas.getElement(), inputState});
            const inputActionMap = new InputActionMap({inputState});

            const timer = new Timer();

            const camera = new Camera({
                width: this.canvas.getWidth(),
                height: this.canvas.getHeight(),
                position: new Point({x: 0, y: 0}),
                zoom: this.cameraZoom
            });

            let t0 = timer.getTime();

            this.interval = setInterval(() => {
                const t1 = timer.getTime();
                const dT = (t1 - t0);

                this.canvas.clear();
                this.canvas.set(this.canvasRenderProps);

                camera.setZoom(this.cameraZoom);

                processTick({
                    canvas: this.canvas,
                    objectTransformer,
                    world,
                    camera,
                    inputActionMap,
                    dT,
                    timeMultiplier: this.timeMultiplier,
                    targetObjectId: this.targetObjectId
                });

                simulateTranslation(this.canvas.getObjects(), timer);

                this.canvas.renderAll();

                t0 = t1;
            }, 10);
        });
    }

    clear() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.canvas.clear();
    }

    setTimeMultiplier(value) {
        this.timeMultiplier = value;
    }

    setZoom(value) {
        this.cameraZoom = value;
    }

    setTargetObject(id) {
        this.targetObjectId = id;
    }

}

export default Game