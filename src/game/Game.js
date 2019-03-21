import {fabric} from "fabric";

import objectTransformer from "fabric/objectTransformer";
import canvasListener from "game/input/canvasListener";
import inputListener from "game/input/inputListener";
import InputState from "game/input/InputState";
import Point from "game/math/Point";
import simulateInput from "game/simulation/simulateInput";
import simulateTranslation from "game/simulation/simulateTranslation";
import simulateWorld from "game/simulation/simulateWorld";
import Camera from "game/world/Camera";
import generateWorld from "game/world/generateWorld";
import InputActionMap from "game/world/InputActionMap";
import Timer from "game/world/Timer";
import uiInfoBuilder from "game/world/uiInfoBuilder";

function processTick({canvas, objectTransformer, world, inputActionMap, camera, playerShip, dT, timeMultiplier, targetObjectId}) {
    simulateWorld(world, dT * timeMultiplier);

    simulateInput({
        inputActionMap,
        camera,
        playerShip,
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

    const infoLines = uiInfoBuilder.getInfoLines({world, dT, timeMultiplier, playerShip, targetObjectId});
    const infoText = new fabric.Text(infoLines.join("\r\n"), {
        fontWeight: 'bold',
        fill: `white`,
        fontFamily: 'Arial',
        fontSize: 12,
        left: 0,
        top: 0
    });
    canvas.add(infoText);
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

            const playerShip = world.playerShip;
            world.objects.push(playerShip);

            let t0 = timer.getTime();

            this.gameObjects = world.objects;

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
                    playerShip,
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
        this.timeMultiplier = +value;
    }

    setZoom(value) {
        this.cameraZoom = value;
    }

    setTargetObject(id) {
        this.targetObjectId = id;
    }

    getTargetObjectData() {
        return this.getObjectDataById(this.targetObjectId);
    }

    getObjectDataById(id) {
        if (!this.gameObjects) {
            return null;
        }
        return this.gameObjects.find((o) => o.getId() === id);
    }

}

export default Game