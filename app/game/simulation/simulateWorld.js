import MathUtil from 'game/math/MathUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

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

        for (let otherObj of objects) {
            const otherGameData = otherObj.get("gameData");
            if (!otherGameData.gravityForce) {
                continue;
            }

            const gravityVectorAngle = MathUtil.calcAngle({center: objPoint, point: getObjectPoint({object: otherObj, world})});

            const gravityVector = new Vector({value: otherGameData.gravityForce, angle: gravityVectorAngle});

            velocityVector = MathUtil.sumVectors({firstVector: velocityVector, secondVector: gravityVector});
        }

        gameData.velocityVector = calcVelocityChange({
            velocityVector: gameData.velocityVector,
            targetVelocity: velocityVector,
            dT: dT
        });

        const finalDirectionVector = new Vector({value: velocityVector.getValue() * dT, angle: velocityVector.getAngle()});

        const newObjPoint = MathUtil.polarToCartesian({center: objPoint, vector: finalDirectionVector});

        world.infoText.set({text: `v: ${Math.round(velocityVector.getValue())} \r\na: ${Math.round(velocityVector.getAngle())}`});

        setObjectPoint({point: newObjPoint, object: obj, world: world});
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

/**
 * @param velocityVector {Vector}
 * @param accelerationVector {Vector}
 * @param dT {Number} optional
 * @return {Vector}
 */
function calcVelocityChange({velocityVector, targetVelocity, dT = 1}) {
    // TODO fix logic
    // const angle = targetVelocity.getAngle() - velocityVector.getAngle();
    //
    // const dV = targetVelocity.getValue() * Math.cos(MathUtil.angleToRadians(angle));
    // const newValue = velocityVector.getValue() + dV * dT;
    // if (newValue < 0) {
    //     return new Vector({value: Math.abs(newValue), angle: targetVelocity.getAngle()});
    // } else {
    //     const influence = targetVelocity.getValue() / velocityVector.getValue();
    //     return new Vector({value: newValue, angle: velocityVector.getAngle() + angle * dT * influence});
    // }
    return velocityVector;
}

/*---------------Test--------------*/

function assertVectorEquals(expected, real) {
    const equal = Math.round(expected.getValue()) === Math.round(real.getValue()) &&
        Math.round(expected.getAngle()) === Math.round(real.getAngle());

    if (!equal) {
        throw new Error(`Got ${real}, expected ${expected}`);
    }
}

// G: V[10, 357.8514879198195° ] Velocity: V[49.14240078869485,  236.9416591870505° ], Direction: V[9.036308801296139, 242.26286833136876°], Point: P[565.167976143597,  179.37042596106056]

// G: V[10, 1.949407745212718° ]

// assertVectorEquals(new Vector({value: 0, angle: 0}), calcVelocity({
//     velocityVector: new Vector({value: 49, angle: 237}),
//     accelerationVector: new Vector({value: 10, angle: 356}) // 44, 261
//     // accelerationVector: new Vector({value: 10, angle: 358}) // 43, 262
//     //accelerationVector: new Vector({value: 10, angle: 2}) // 43, 189
// }));

// ---

// assertVectorEquals(new Vector({value: 17, angle: 0}), calcVelocity({
//     velocityVector: new Vector({value: 10, angle: 0}),
//     accelerationVector: new Vector({value: 10, angle: 45})
// }));
// assertVectorEquals(new Vector({value: 10, angle: 0}), calcVelocity({
//     velocityVector: new Vector({value: 10, angle: 0}),
//     accelerationVector: new Vector({value: 10, angle: 90})
// }));
// assertVectorEquals(new Vector({value: 3, angle: 0}), calcVelocity({
//     velocityVector: new Vector({value: 10, angle: 0}),
//     accelerationVector: new Vector({value: 10, angle: 135})
// }));
// assertVectorEquals(new Vector({value: 4, angle: 135}), calcVelocity({
//     velocityVector: new Vector({value: 10, angle: 0}),
//     accelerationVector: new Vector({value: 20, angle: 135})
// }));
// assertVectorEquals(new Vector({value: 0, angle: 0}), calcVelocity({
//     velocityVector: new Vector({value: 10, angle: 0}),
//     accelerationVector: new Vector({value: 10, angle: 180})
// }));
// assertVectorEquals(new Vector({value: 20, angle: 0}), calcVelocity({
//     velocityVector: new Vector({value: 10, angle: 0}),
//     accelerationVector: new Vector({value: 10, angle: 0})
// }));

/*---------------End Test--------------*/


export default simulateWorld;