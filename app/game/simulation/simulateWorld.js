import {MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT} from 'game/input/inputListener';

import MathUtil from 'game/math/MathUtil';
import PhysUtil from 'game/physics/PhysUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

function simulateWorld(world, dT) {
    dT = dT / 1000; // seconds
    dT = dT * world.timeMultiplier; // multiplier

    // TODO draw additional controls on UI (time multiplier etc.)
    // TODO calculate for multiple objects
    // TODO Draw orbit ellipse

    for (let obj of world.objects) {

        const physicsData = obj.get("physicsData");

        if (physicsData.static) {
            continue;
        }

        const objects = world.objects.slice();
        objects.splice(objects.indexOf(obj), 1);

        const objPoint = getObjectPoint({object: obj, world});

        let velocityVector = physicsData.velocityVector || new Vector({value: 0, angle: 0});

        for (let otherObj of objects) {
            const otherPhysicsData = otherObj.get("physicsData");
            if (!otherPhysicsData.mass) {
                continue;
            }

            const otherObjPoint = getObjectPoint({object: otherObj, world});

            const distanceVector = MathUtil.calcDistance({center: objPoint, point: otherObjPoint});

            let distance = pixelToMeter(distanceVector.getValue());

            const Fg = PhysUtil.calcGravityForce({
                m1: otherPhysicsData.mass,
                m2: physicsData.mass,
                distance: distance
            });

            const g = PhysUtil.calcGravityAcceleration({force: Fg, m2: physicsData.mass});

            const gravityVector = new Vector({value: g * dT, angle: distanceVector.getAngle()});

            velocityVector = MathUtil.sumVectors({
                firstVector: velocityVector,
                secondVector: gravityVector,
            });

            world.infoText.set({text: `R: ${Math.round(distance)} m \r\nV: ${Math.round(velocityVector.getValue())} m/s`});
        }

        physicsData.velocityVector = velocityVector;

        const finalDirectionVector = new Vector({
            value: meterToPixel(physicsData.velocityVector.getValue() * dT),
            angle: physicsData.velocityVector.getAngle()
        });

        const newObjPoint = MathUtil.polarToCartesian({center: objPoint, vector: finalDirectionVector});

        setObjectPoint({point: newObjPoint, object: obj, world: world});

        if (world.input[MOVE_UP]) {
            physicsData.velocityVector = new Vector({
                value: physicsData.velocityVector.getValue() + 1,
                angle: physicsData.velocityVector.getAngle()
            });
        }

        if (world.input[MOVE_DOWN]) {
            physicsData.velocityVector = new Vector({
                value: physicsData.velocityVector.getValue() - 1,
                angle: physicsData.velocityVector.getAngle()
            });
        }

    }

}

function pixelToMeter(pixels) {
    return pixels * Math.pow(10, 6);
}

function meterToPixel(meters) {
    return meters * Math.pow(10, -6);
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