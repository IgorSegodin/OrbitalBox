import {MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT} from 'game/input/inputListener';

import MathUtil from 'game/math/MathUtil';
import PhysUtil from 'game/physics/PhysUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

function simulateWorld(world, dT) {
    dT = dT / 1000; // seconds

    for (let obj of world.objects) {

        const physicsData = obj.getPhysicsData();

        if (!physicsData || obj.getProperties().static) {
            continue;
        }

        const objects = world.objects.slice();
        objects.splice(objects.indexOf(obj), 1);

        const objPoint = obj.getPosition();

        let velocityVector = physicsData.getVelocity() || new Vector({value: 0, angle: 0});

        for (let otherObj of objects) {
            const otherPhysicsData = otherObj.getPhysicsData();
            if (!otherPhysicsData || !otherPhysicsData.getMass()) {
                continue;
            }

            const otherObjPoint = otherObj.getPosition();

            const distanceVector = MathUtil.calcDistance({center: objPoint, point: otherObjPoint});

            let distance = distanceVector.getValue();

            const Fg = PhysUtil.calcGravityForce({
                m1: otherPhysicsData.getMass(),
                m2: physicsData.getMass(),
                distance: distance
            });

            const g = PhysUtil.calcGravityAcceleration({force: Fg, m2: physicsData.getMass()});

            const gravityVector = new Vector({value: g * dT, angle: distanceVector.getAngle()});

            velocityVector = MathUtil.sumVectors({
                firstVector: velocityVector,
                secondVector: gravityVector,
            });

            world.infoText.set({text: `R: ${Math.round(distance)} m \r\nV: ${Math.round(velocityVector.getValue())} m/s`});
        }

        if (world.input[MOVE_UP]) {
            velocityVector = new Vector({
                value: velocityVector.getValue() + 1,
                angle: velocityVector.getAngle()
            });
        }

        if (world.input[MOVE_DOWN]) {
            velocityVector = new Vector({
                value: velocityVector.getValue() - 1,
                angle: velocityVector.getAngle()
            });
        }

        const finalDirectionVector = new Vector({
            value: velocityVector.getValue() * dT,
            angle: velocityVector.getAngle()
        });
        const newObjPoint = MathUtil.polarToCartesian({center: objPoint, vector: finalDirectionVector});

        physicsData.setVelocity(velocityVector);
        obj.setPosition(newObjPoint);
    }

}

export default simulateWorld;