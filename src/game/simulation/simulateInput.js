import ObjectData from "game/data/ObjectData";
import MathUtil from "game/math/MathUtil";
import Point from "game/math/Point";
import Vector from "game/math/Vector";
import Camera from 'game/world/Camera';
import InputActionMap from 'game/world/InputActionMap';

/**
 * @param camera {Camera}
 * @param dT {Number} time between ticks
 */
function calcDelta({camera, dT}) {
    return Math.pow(10, 5) * dT;
}

/**
 * @param world
 * @param inputActionMap {InputActionMap}
 * @param camera {Camera}
 * @param playerShip {ObjectData}
 * @param targetObjectId {Number}
 * @param dT {Number} time between ticks
 */
function simulateInput({world, inputActionMap, camera, playerShip, targetObjectId, dT}) {
    const pos = camera.getPosition();

    let x = pos.getX();
    let y = pos.getY();

    if (inputActionMap.isCameraMoveUp()) {
        y += calcDelta({camera, dT});
    }

    if (inputActionMap.isCameraMoveDown()) {
        y -= calcDelta({camera, dT});
    }
    if (inputActionMap.isCameraMoveLeft()) {
        x -= calcDelta({camera, dT});
    }
    if (inputActionMap.isCameraMoveRight()) {
        x += calcDelta({camera, dT});
    }

    if (targetObjectId) {
        world.objects.filter((o) => o.getId() === targetObjectId).forEach((o) => {
            x = o.getPosition().getX();
            y = o.getPosition().getY();
        });
    } else {
        x = playerShip.getPosition().getX();
        y = playerShip.getPosition().getY();
    }

    if (pos.getX() !== x || pos.getY() !== y) {
        camera.setPosition(new Point({
            x: x,
            y: y
        }));
    }

    let shipRotationAngle = playerShip.getProperties().rotationAngle;

    if (inputActionMap.isShipRotateLeft()) {
        shipRotationAngle = shipRotationAngle + 0.1 * dT;
    }
    if (inputActionMap.isShipRotateRight()) {
        shipRotationAngle = shipRotationAngle - 0.1 * dT;
    }

    playerShip.getProperties().rotationAngle = shipRotationAngle;

    let shipVelocityVector = playerShip.getPhysicsData().getVelocity();

    if (inputActionMap.isShipAccelerate()) {
        shipVelocityVector = MathUtil.sumVectors({
            firstVector: shipVelocityVector,
            secondVector: new Vector({
                value: 0.3 * dT,
                angle: shipRotationAngle
            }),
        });
    }
    if (inputActionMap.isShipDecelerate()) {
        shipVelocityVector = MathUtil.sumVectors({
            firstVector: shipVelocityVector,
            secondVector: new Vector({
                value: 0.3 * dT,
                angle: shipRotationAngle + 180
            }),
        });
    }

    playerShip.getPhysicsData().setVelocity(shipVelocityVector);

}

export default simulateInput;