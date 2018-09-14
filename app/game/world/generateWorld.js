import {fabric} from 'fabric';
import PekaImage from 'peka.png';
import DollarImage from 'dollar.png';
import {promiseImage} from 'util/FabricUtil';

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function generateWorld(width, height) {

    const objects = [];

    objects.push(
        new fabric.Circle({
            left: (width / 2) - 50,
            top: 0,
            fill: 'black',
            radius: 50
        })
    );

    return new Promise((resolve, reject) => {
        const world = {
            width: width,
            height: height,
            objects: objects,
            input: {},
            cursor: {
                input: {},
                x: 0,
                y: 0
            },
            eventCallbacks: {}
        };

        resolve(world);
    });
}

export default generateWorld;