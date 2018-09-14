import {LEFT_MOUSE_BTN, RIGHT_MOUSE_BTN} from 'game/input/canvasListener';
import {containPoint} from 'util/FabricUtil';

function simulateWorld(world, dT) {
    dT = dT / 1000;

    for (let obj of world.objects) {

        if (world.cursor.input[LEFT_MOUSE_BTN] &&
            containPoint({x: world.cursor.x, y: world.cursor.y}, obj)) {
            console.log(`dV: ${1 * dT}`);
            obj.set({
                velocity: obj.get("velocity") + (15 * dT)
            });
        }

        const height = world.height - obj.get("top") - obj.getHeight();
        const velocity = obj.get("velocity");

        const newProps = calcNextProps({
            height: height / 100,
            velocity
        }, dT);

        let top = world.height - (newProps.height * 100) - obj.getHeight();

        obj.set({
            top: top,
            velocity: newProps.velocity
        });
    }

}

/**
 * @param height
 * @param velocity
 * @param dT in seconds
 * @return {{height: number, velocity: number}}
 */
function calcNextProps({height, velocity = 0}, dT) {
    const g = 9.8;
    const rho = 0.75; // coefficient of restitution

    velocity = Math.abs(velocity) < 0.0001 ? 0 : velocity;

    const dH = velocity * dT - g * dT * dT / 2;

    const newHeight = height + dH;

    if (newHeight < 0) {
        // bounce
        return {
            height: 0,
            velocity: Math.abs(velocity * rho)
        }
    }

    return {
        height: newHeight,
        velocity: velocity - g * dT
    };
}

export default simulateWorld;