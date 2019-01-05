import objectTypes from 'game/data/objectTypes';
import ObjectData from "game/data/ObjectData";
import MathUtil from 'game/math/MathUtil'
import PhysUtil from 'game/physics/PhysUtil'


function calcOrbitParams({playerShip, targetObject, distanceVector, dT, timeMultiplier}) {
    const previousOrientationData = playerShip.getProperties().orientationData;
    const newOrientationData = {
        position: playerShip.getPosition(),
        distance: distanceVector
    };

    const orbitData = {};

    if (previousOrientationData) {
        let alpha = Math.abs(newOrientationData.distance.getAngle() - previousOrientationData.distance.getAngle());

        if (alpha > 0) {
            const r = (newOrientationData.distance.getValue() + previousOrientationData.distance.getValue()) / 2;
            const curve = Math.PI * r * alpha / 180;

            orbitData.velocity = curve / (dT * timeMultiplier) * 1000;

            playerShip.getProperties().orientationData = newOrientationData;
        }
    } else {
        playerShip.getProperties().orientationData = newOrientationData;
    }

    if (orbitData.velocity && targetObject.getPhysicsData() && targetObject.getPhysicsData().getMass()) {
        let gamma = Math.abs((distanceVector.getAngle() + 180) % 360 - playerShip.getPhysicsData().getVelocity().getAngle());
        const orbitParams = PhysUtil.calcOrbitParameters({
            m1: targetObject.getPhysicsData().getMass(),
            r: distanceVector.getValue(),
            v: orbitData.velocity,
            gamma: gamma
        });
        if (!playerShip.getProperties().orbitData) {
            playerShip.getProperties().orbitData = {periapsis: orbitParams.periapsis, apoapsis: orbitParams.apoapsis};
        }

        Object.assign(orbitData, orbitParams, playerShip.getProperties().orbitData);
    }

    return orbitData;
}

/**
 * @param world {Object}
 * @param dT {Number}
 * @param playerShip {ObjectData}
 * @param targetObjectId {Number}
 * @return {Array<String>}
 */
function getInfoLines({world, dT, timeMultiplier, playerShip, targetObjectId}) {
    const lines = [];
    if (dT === 0) {
        return lines;
    }

    const targetObject = world.objects.filter((o) => o.getId() === targetObjectId)[0];

    lines.push(`FPS: ${1000 / dT}`);
    lines.push("");

    let shipVelocity = playerShip.getPhysicsData().getVelocity().getValue();
    if (targetObject && targetObject.getPhysicsData() && targetObject.getPhysicsData().getVelocity()) {
        shipVelocity = Math.abs(shipVelocity - targetObject.getPhysicsData().getVelocity().getValue());
    }

    lines.push(`Ship`);
    lines.push(`    V: ${shipVelocity.toFixed(2)} m/s`);
    lines.push(`    M: ${(playerShip.getPhysicsData().getMass()).toFixed(0)} kg`);

    lines.push("");

    if (targetObject) {
        lines.push(`Target`);
        lines.push(`    Name: ${targetObject.getName()}`);

        const distanceVector = MathUtil.calcDistance({
            center: playerShip.getPosition(),
            point: targetObject.getPosition()
        });

        let distance = distanceVector.getValue();
        if (targetObject.getType() === objectTypes.PLANET) {
            distance -= targetObject.getProperties().radius;
        }
        lines.push(`    R: ${(distance / 1000).toFixed(3)} km`);

        if (targetObject.getPhysicsData()) {
            if (targetObject.getPhysicsData().getVelocity()) {
                lines.push(`    V: ${targetObject.getPhysicsData().getVelocity().getValue().toFixed(2)} m/s`);
            }
            if (targetObject.getPhysicsData().getMass()) {
                lines.push(`    M: ${(targetObject.getPhysicsData().getMass() * Math.pow(10, -20)).toFixed(0)} x 10^20 kg`);
            }
        }

        let orbitParams = calcOrbitParams({playerShip, targetObject, distanceVector, dT, timeMultiplier});

        if (orbitParams && orbitParams.velocity) {
            lines.push(`Orbit`);
            lines.push(`    V: ${orbitParams.velocity.toFixed(2)} m/s`);
            lines.push(`    Rp: ${(orbitParams.periapsis / 1000).toFixed(3)} km`);
            lines.push(`    Ra: ${(orbitParams.apoapsis / 1000).toFixed(3)} km`);
            // lines.push(`    gamma: ${orbitParams.gamma}`);
            lines.push(`    a: ${orbitParams.a}`);
            lines.push(`    e: ${orbitParams.e}`);
        }
    }

    return lines;
}

export default {
    getInfoLines
};