import {fabric} from 'fabric';
// import PekaImage from 'peka.png';
// import DollarImage from 'dollar.png';
// import {promiseImage} from 'util/FabricUtil';
import Vector from 'game/math/Vector'
import PhysUtil from 'game/physics/PhysUtil';

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function generateWorld(width, height) {

    const EARTH_RADIUS = PhysUtil.EARTH_RADIUS * Math.pow(10, -6);
    const MOON_RADIUS = PhysUtil.MOON_RADIUS * Math.pow(10, -6);
    const EARTH_TO_MOON_DISTANCE = PhysUtil.EARTH_TO_MOON_DISTANCE * Math.pow(10, -6);

    const objects = [];

    objects.push(
        new fabric.Circle({
            left: (width / 2) - EARTH_RADIUS,
            top: (height / 2) - EARTH_RADIUS,
            fill: 'green',
            radius: EARTH_RADIUS,
            gameData: {
                name: "Earth",
            },
            physicsData: {
                static: true,
                mass: PhysUtil.EARTH_MASS,
            },

            selectable: true,
            hasControls: false,
            hasBorders: false,
        })
    );

    objects.push(
        new fabric.Circle({
            left: (width / 2) - MOON_RADIUS + EARTH_TO_MOON_DISTANCE,
            top: (height / 2) - MOON_RADIUS,
            fill: 'gray',
            radius: MOON_RADIUS,
            gameData: {
                name: "Moon",
            },
            physicsData: {
                mass: PhysUtil.MOON_MASS,
                velocityVector: new Vector({
                    value: PhysUtil.MOON_VELOCITY_AROUND_EARTH,
                    angle: 90
                })
            },

            selectable: false
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