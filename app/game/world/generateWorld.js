import {fabric} from 'fabric';

import Point from 'game/math/Point'
import Vector from 'game/math/Vector'
import PhysUtil from 'game/physics/PhysUtil';

import ObjectData from 'game/data/ObjectData';
import PhysicsData from 'game/data/PhysicsData';
import objectTypes from 'game/data/objectTypes';

import {generateId} from 'game/world/generateId';

import EarthImage from 'game/resources/images/planets/04earth.png';
import MoonImage from 'game/resources/images/planets/05moon.png';

function generateWorld(width, height) {
    return new Promise(function (resolve, reject) {
        const world = {
            width: width,
            height: height,
            objects: [
                new ObjectData({
                    id: generateId(),
                    name: "Earth",
                    type: objectTypes.PLANET,
                    position: new Point({x: 0, y: 0}),
                    physicsData: new PhysicsData({
                        mass: PhysUtil.EARTH_MASS,
                        velocityVector: null
                    }),
                    properties: {
                        radius: PhysUtil.EARTH_RADIUS,
                        image: EarthImage,
                        static: true
                    }
                }),

                new ObjectData({
                    id: generateId(),
                    name: "Moon",
                    type: objectTypes.PLANET,
                    position: new Point({x: PhysUtil.EARTH_TO_MOON_DISTANCE, y: 0}),
                    physicsData: new PhysicsData({
                        mass: PhysUtil.MOON_MASS,
                        velocityVector: new Vector({
                            value: PhysUtil.MOON_VELOCITY_AROUND_EARTH,
                            angle: 90
                        })
                    }),
                    properties: {
                        radius: PhysUtil.MOON_RADIUS,
                        image: MoonImage
                    }
                }),
            ],
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