import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import PhysicsData from 'game/data/PhysicsData';

import Point from 'game/math/Point'
import Vector from 'game/math/Vector'

import SunImage from 'game/resources/images/planets/01sun.png';
import MercuryImage from 'game/resources/images/planets/02mercury.png';
import VenusImage from 'game/resources/images/planets/03venus.png';
import EarthImage from 'game/resources/images/planets/04earth.png';
import MoonImage from 'game/resources/images/planets/05moon.png';
import MarsImage from 'game/resources/images/planets/06mars.png';
import JupiterImage from 'game/resources/images/planets/07jupiter.png';
import SaturnImage from 'game/resources/images/planets/08saturn.png';
import UranusImage from 'game/resources/images/planets/09uranus.png';
import NeptuneImage from 'game/resources/images/planets/010neptune.png';
import PlutoImage from 'game/resources/images/planets/011pluto.png';

import {generateId} from 'game/world/generateId';

import {

    EARTH_MASS,
    EARTH_RADIUS,
    EARTH_AROUND_SUN_PERIAPSIS,
    EARTH_AROUND_SUN_PERIAPSIS_VELOCITY,

    MOON_MASS,
    MOON_RADIUS,
    MOON_AROUND_EARTH_PERIAPSIS,
    MOON_AROUND_EARTH_PERIAPSIS_VELOCITY,

    SUN_MASS,
    SUN_RADIUS,

    MERCURY_MASS,
    MERCURY_RADIUS,
    MERCURY_AROUND_SUN_PERIAPSIS,
    MERCURY_AROUND_SUN_PERIAPSIS_VELOCITY,

    VENUS_MASS,
    VENUS_RADIUS,
    VENUS_AROUND_SUN_PERIAPSIS,
    VENUS_AROUND_SUN_PERIAPSIS_VELOCITY,

    MARS_MASS,
    MARS_RADIUS,
    MARS_AROUND_SUN_PERIAPSIS,
    MARS_AROUND_SUN_PERIAPSIS_VELOCITY,

    JUPITER_MASS,
    JUPITER_RADIUS,
    JUPITER_AROUND_SUN_PERIAPSIS,
    JUPITER_AROUND_SUN_PERIAPSIS_VELOCITY,

    SATURN_MASS,
    SATURN_RADIUS,
    SATURN_AROUND_SUN_PERIAPSIS,
    SATURN_AROUND_SUN_PERIAPSIS_VELOCITY,

    URANUS_MASS,
    URANUS_RADIUS,
    URANUS_AROUND_SUN_PERIAPSIS,
    URANUS_AROUND_SUN_PERIAPSIS_VELOCITY,

    NEPTUNE_MASS,
    NEPTUNE_RADIUS,
    NEPTUNE_AROUND_SUN_PERIAPSIS,
    NEPTUNE_AROUND_SUN_PERIAPSIS_VELOCITY,

    PLUTO_MASS,
    PLUTO_RADIUS,
    PLUTO_AROUND_SUN_PERIAPSIS,
    PLUTO_AROUND_SUN_PERIAPSIS_VELOCITY,
} from 'game/physics/PlanetConstants';

/**
 * @param name {String}
 * @param mass {Number}
 * @param radius {Number}
 * @param image {String}
 * @param aroundSunPeriapsis {Number}
 * @param velocity {Number}
 * @return {ObjectData}
 */
function createPlanet({name, mass, radius, image, aroundSunPeriapsis, velocity}) {
    return new ObjectData({
        id: generateId(),
        name: name,
        type: objectTypes.PLANET,
        position: new Point({x: aroundSunPeriapsis, y: 0}),
        physicsData: new PhysicsData({
            mass: mass,
            velocityVector: new Vector({
                value: velocity,
                angle: 90
            })
        }),
        properties: {
            radius: radius,
            image: image,
        }
    });
}

function createPlayerShip() {
    return new ObjectData({
        id: generateId(),
        name: "Ship",
        type: objectTypes.SHIP,
        position: new Point({x: EARTH_AROUND_SUN_PERIAPSIS + EARTH_RADIUS + 400000, y: 0}),
        physicsData: new PhysicsData({
            mass: 20000,
            velocityVector: new Vector({
                value: EARTH_AROUND_SUN_PERIAPSIS_VELOCITY + 7672.4,
                angle: 90
            })
        }),
        properties: {
            width: 50,
            height: 120,
            rotationAngle: 90
        }
    });
}

/**
 * @return {Promise<Object>}
 */
function generateWorld() {
    return new Promise(function (resolve, reject) {
        const world = {

            playerShip: createPlayerShip(),

            objects: [
                new ObjectData({
                    id: generateId(),
                    name: "Sun",
                    type: objectTypes.PLANET,
                    position: new Point({x: 0, y: 0}),
                    physicsData: new PhysicsData({
                        mass: SUN_MASS,
                        velocityVector: null
                    }),
                    properties: {
                        radius: SUN_RADIUS,
                        image: SunImage,
                        static: true
                    }
                }),

                createPlanet({
                    name: "Mercury",
                    mass: MERCURY_MASS,
                    radius: MERCURY_RADIUS,
                    image: MercuryImage,
                    aroundSunPeriapsis: MERCURY_AROUND_SUN_PERIAPSIS,
                    velocity: MERCURY_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Venus",
                    mass: VENUS_MASS,
                    radius: VENUS_RADIUS,
                    image: VenusImage,
                    aroundSunPeriapsis: VENUS_AROUND_SUN_PERIAPSIS,
                    velocity: VENUS_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Earth",
                    mass: EARTH_MASS,
                    radius: EARTH_RADIUS,
                    image: EarthImage,
                    aroundSunPeriapsis: EARTH_AROUND_SUN_PERIAPSIS,
                    velocity: EARTH_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Moon",
                    mass: MOON_MASS,
                    radius: MOON_RADIUS,
                    image: MoonImage,
                    aroundSunPeriapsis: EARTH_AROUND_SUN_PERIAPSIS + MOON_AROUND_EARTH_PERIAPSIS,
                    velocity: EARTH_AROUND_SUN_PERIAPSIS_VELOCITY + MOON_AROUND_EARTH_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Mars",
                    mass: MARS_MASS,
                    radius: MARS_RADIUS,
                    image: MarsImage,
                    aroundSunPeriapsis: MARS_AROUND_SUN_PERIAPSIS,
                    velocity: MARS_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Jupiter",
                    mass: JUPITER_MASS,
                    radius: JUPITER_RADIUS,
                    image: JupiterImage,
                    aroundSunPeriapsis: JUPITER_AROUND_SUN_PERIAPSIS,
                    velocity: JUPITER_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Saturn",
                    mass: SATURN_MASS,
                    radius: SATURN_RADIUS,
                    image: SaturnImage,
                    aroundSunPeriapsis: SATURN_AROUND_SUN_PERIAPSIS,
                    velocity: SATURN_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Uranus",
                    mass: URANUS_MASS,
                    radius: URANUS_RADIUS,
                    image: UranusImage,
                    aroundSunPeriapsis: URANUS_AROUND_SUN_PERIAPSIS,
                    velocity: URANUS_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Neptune",
                    mass: NEPTUNE_MASS,
                    radius: NEPTUNE_RADIUS,
                    image: NeptuneImage,
                    aroundSunPeriapsis: NEPTUNE_AROUND_SUN_PERIAPSIS,
                    velocity: NEPTUNE_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),

                createPlanet({
                    name: "Pluto",
                    mass: PLUTO_MASS,
                    radius: PLUTO_RADIUS,
                    image: PlutoImage,
                    aroundSunPeriapsis: PLUTO_AROUND_SUN_PERIAPSIS,
                    velocity: PLUTO_AROUND_SUN_PERIAPSIS_VELOCITY,
                }),
            ]
        };
        resolve(world);
    });
}

export default generateWorld;