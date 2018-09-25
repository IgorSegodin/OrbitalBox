import {MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT} from 'game/input/inputListener';

import MathUtil from 'game/math/MathUtil';
import PhysUtil from 'game/physics/PhysUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';


// TODO calc dV, dA for each force vector

// TODO use more real formulas for calculating gravity F

// F = G * m1 * m2 / r^2

// V = V - g * dT^2 / 2

// G = 6.7385 * 10^(-11) = м^3 / (кг * с^2)



function simulateWorld(world, dT) {
    dT = dT / 1000; // seconds

    for (let obj of world.objects) {

        const gameData = obj.get("gameData");

        if (gameData.static) {
            continue;
        }

        const objects = world.objects.slice();
        objects.splice(objects.indexOf(obj), 1);

        const objPoint = getObjectPoint({object: obj, world});

        let velocityVector = gameData.velocityVector || new Vector({value: 0, angle: 0});

        let dV = 0;
        let dA = 0;

        const initialVelocity = velocityVector;
        let gForce;

        for (let otherObj of objects) {
            const otherGameData = otherObj.get("gameData");
            if (!otherGameData.gravityForce) {
                continue;
            }

            const otherObjPoint = getObjectPoint({object: otherObj, world});

            const gravityVectorAngle = MathUtil.calcAngle({center: objPoint, point: otherObjPoint});

            const gravityVector = new Vector({value: otherGameData.gravityForce, angle: gravityVectorAngle});

            gForce = gravityVector;

            velocityVector = PhysUtil.calcVelocityChange({
                velocityVector: velocityVector,
                targetVelocity: gravityVector,
                dT: dT
            });

            const distance = MathUtil.calcDistance({center: objPoint, point: otherObjPoint});
            world.infoText.set({text: `R: ${Math.round(distance)} \r\nV: ${Math.round(velocityVector.getValue())}`});
        }

        gameData.velocityVector = velocityVector;

        const finalDirectionVector = new Vector({value: gameData.velocityVector.getValue() * dT, angle: gameData.velocityVector.getAngle()});

        const newObjPoint = MathUtil.polarToCartesian({center: objPoint, vector: finalDirectionVector});

        console.log(`Velocity ${initialVelocity}, ${gameData.velocityVector}, Point ${objPoint}, ${newObjPoint}, Force ${gForce}`);

        setObjectPoint({point: newObjPoint, object: obj, world: world});

        if (world.input[MOVE_UP]) {
            gameData.velocityVector = new Vector({
                    value: gameData.velocityVector.getValue() + 100 * dT,
                angle:gameData.velocityVector.getAngle()
            });
        }

        if (world.input[MOVE_DOWN]) {
            gameData.velocityVector = new Vector({
                value: gameData.velocityVector.getValue() - 100 * dT,
                angle:gameData.velocityVector.getAngle()
            });
        }

    }

}

/**
 * @param object
 * @param world
 * @return {Point}
 */
function getObjectPoint({object, world}) {
    const top = object.get("top");
    const left = object.get("left");
    const width = object.getWidth();
    const height = object.getHeight();

    return new Point({
        x: left + width / 2,
        y: world.height - top - height / 2
    });
}

/**
 * @param point {Point}
 * @param object {Object}
 * @param world {Object}
 */
function setObjectPoint({point, object, world}) {
    object.set({
        left: point.getX() - object.getWidth() / 2,
        top: world.height - point.getY() - object.getHeight() / 2
    });
}

export default simulateWorld;