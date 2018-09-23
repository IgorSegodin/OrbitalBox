import {fabric} from 'fabric';
import PekaImage from 'peka.png';
import DollarImage from 'dollar.png';
import {promiseImage} from 'util/FabricUtil';
import Vector from 'game/math/Vector'

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

// 1m == 100px

function generateWorld(width, height) {

    const objects = [];

    objects.push(
        new fabric.Circle({
            left: (width / 2) - 50,
            top: (height / 2) - 50,
            fill: 'black',
            radius: 50,
            gameData: {
                name: "Earth",
                gravityForce: 10, // m/s^2
                static: true
            }
        })
    );

    objects.push(
        new fabric.Circle({
            left: (width / 2) - 10 + 250,
            top: (height / 2) - 10,
            fill: 'gray',
            radius: 10,
            gameData: {
                name: "Moon",
                velocityVector: new Vector({
                    value: 30,
                    angle: 120
                })
            }
        })
    );

    return new Promise((resolve, reject) => {
        const world = {
            width: width,
            height: height,
            objects: objects,
            infoText: getInfoTextObject(),
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

function getInfoTextObject() {
    const textElem = new fabric.Text("", {
        fontWeight: 'bold',
        fill: `black`,
        fontSize: 20,
    });
    return textElem;

    // textElem.set({
    //     left: this.canvas.getWidth() / 2 - textElem.getWidth() / 2,
    //     top: this.canvas.getHeight() / 2 - textElem.getHeight() / 2,
    // });
    //
    // this.canvas.add(textElem);
}

export default generateWorld;