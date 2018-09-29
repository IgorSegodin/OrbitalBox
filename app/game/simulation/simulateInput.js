import Point from "game/math/Point";
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
 * @param targetObjectId {Number}
 * @param dT {Number} time between ticks
 */
function simulateInput({world, inputActionMap, camera, targetObjectId, dT}) {
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
    }

    if (pos.getX() !== x || pos.getY() !== y) {
        camera.setPosition(new Point({
            x: x,
            y: y
        }));
    }
}

export default simulateInput;