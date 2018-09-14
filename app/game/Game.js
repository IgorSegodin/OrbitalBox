import {fabric} from 'fabric';

import generateWorld from 'game/world/generateWorld';
import simulateWorld from 'game/simulation/simulateWorld';
import simulateTranslation from 'game/simulation/simulateTranslation';
import inputListener from 'game/input/inputListener';
import canvasListener from 'game/input/canvasListener';

class Game {

    constructor(canvasEl) {
        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.setHeight(window.innerHeight * 0.98);
        this.canvas.setWidth(window.innerWidth * 0.98);
    }

    init() {
        this.start();
    }

    start() {
        generateWorld(this.canvas.getWidth(), this.canvas.getHeight()).then((world) => {

            this.clear();

            for (let obj of world.objects) {
                this.canvas.add(obj);
            }

            inputListener(world);
            canvasListener(this.canvas.getElement(), world);

            let t0 = new Date().getTime();

            this.interval = setInterval(() => {
                const t1 = new Date().getTime();
                simulateWorld(world, t1 - t0);
                simulateTranslation(this.canvas.getObjects(), world);
                this.canvas.renderAll();
                t0 = t1;
            }, 1);
        });
    }

    clear() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        this.canvas.clear();
    }

}

export default Game