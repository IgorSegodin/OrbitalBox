import MathUtil from 'game/math/MathUtil';
import Vector from 'game/math/Vector';
import PhysUtil from 'game/physics/PhysUtil';

function simulateWorld(world, dT) {
    dT = dT / 1000; // seconds

    if (dT === 0) {
        return;
    }

    const simData = {};

    for (let obj of world.objects) {

        const physicsData = obj.getPhysicsData();

        if (!physicsData || obj.getProperties().static) {
            continue;
        }

        const objects = world.objects.slice();
        objects.splice(objects.indexOf(obj), 1);

        const objPoint = obj.getPosition();

        let velocityVector = physicsData.getVelocity() || new Vector({value: 0.001, angle: 0});

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
        }

        const finalDirectionVector = new Vector({
            value: velocityVector.getValue() * dT,
            angle: velocityVector.getAngle()
        });
        const newObjPoint = MathUtil.polarToCartesian({center: objPoint, vector: finalDirectionVector});

        simData[obj.getId()] = {
            velocityVector,
            position: newObjPoint,
            object: obj
        };
    }

    Object.keys(simData).forEach(k => {
        const data = simData[k];
        data.object.getPhysicsData().setVelocity(data.velocityVector);
        data.object.setPosition(data.position);
    });

}

export default simulateWorld;