import {fabric} from 'fabric';

import Vector from 'game/math/Vector'
import PhysUtil from 'game/physics/PhysUtil';

import {promiseImage} from 'util/FabricUtil';
import EarthImage from 'game/resources/images/planets/04earth.png';
import MoonImage from 'game/resources/images/planets/05moon.png';

function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}
const SCALE = Math.pow(10, -6) * 2;

const EARTH_RADIUS = PhysUtil.EARTH_RADIUS * SCALE;
const MOON_RADIUS = PhysUtil.MOON_RADIUS * SCALE;
const EARTH_TO_MOON_DISTANCE = PhysUtil.EARTH_TO_MOON_DISTANCE * Math.pow(10, -6);

function promiseEarthObject({width, height}) {
    return promiseImage(EarthImage).then(function (earth) {
        earth.set({
            left: (width / 2) - EARTH_RADIUS,
            top: (height / 2) - EARTH_RADIUS,
            width: EARTH_RADIUS * 2,
            height: EARTH_RADIUS * 2,
            gameData: {
                name: "Earth",
            },
            physicsData: {
                static: true,
                mass: PhysUtil.EARTH_MASS,
            },

            selectable: true,
            hasControls: false,
            hasBorders: false
        });

        return earth;
    });
}

function promiseMoonObject({width, height}) {
    return promiseImage(MoonImage).then(function (earth) {
        earth.set({
            left: (width / 2) - MOON_RADIUS + EARTH_TO_MOON_DISTANCE,
            top: (height / 2) - MOON_RADIUS,
            width: MOON_RADIUS * 2,
            height: MOON_RADIUS * 2,
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
        });

        return earth;
    });
}

function generateWorld(width, height) {
    return Promise.all([promiseEarthObject({width, height}), promiseMoonObject({width, height})]).then((objects) => {
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
        return world;
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