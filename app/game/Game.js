import {fabric} from 'fabric';

import Timer from 'game/world/Timer';
import generateWorld from 'game/world/generateWorld';
import simulateWorld from 'game/simulation/simulateWorld';
import simulateTranslation from 'game/simulation/simulateTranslation';
import inputListener from 'game/input/inputListener';
import canvasListener from 'game/input/canvasListener';

class Game {

    constructor({canvasEl}) {
        this.timeMultiplier = 1;
        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.setHeight(window.innerHeight - 2);
        this.canvas.setWidth(canvasEl.parentNode.parentNode.clientWidth - 2);
    }

    init() {
        this.start();
    }

    start() {
        const thisGame = this;
        generateWorld(this.canvas.getWidth(), this.canvas.getHeight()).then((world) => {

            this.clear();

            world.timeMultiplier = 0;

            window.setTimeMultiplier = function(value) {
                world.timeMultiplier = value < 0 ? 1 : value;
            };

            for (let obj of world.objects) {
                this.canvas.add(obj);
            }
            this.canvas.add(world.infoText);

            inputListener(world);
            canvasListener(this.canvas.getElement(), world);

            const timer = new Timer();

            let t0 = timer.getTime();

            this.interval = setInterval(() => {
                const t1 = timer.getTime();
                const dT = (t1 - t0) * thisGame.timeMultiplier;
                simulateWorld(world, dT);
                simulateTranslation(this.canvas.getObjects(), world);
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

}

export default Game