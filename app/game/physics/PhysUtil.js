import MathUtil from 'game/math/MathUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

// TODO fix horrible peace of sh*t

/**
 * @param velocityVector {Vector}
 * @param targetVelocity {Vector}
 * @param dT {Number} optional
 * @return {Vector}
 */
function calcVelocityChange({velocityVector, targetVelocity, dT = 1}) {
    if (dT > 1) {
        console.warn("dT should be between 0 and 1, but was: " + dT);
        dT = 1;
    }
    let angle = targetVelocity.getAngle() - velocityVector.getAngle();

    let dV;

    let dA = angle;
    if (dA > 180) {
        dA = dA - 360;
    }

    if (dA === 180) {
        dV = - (velocityVector.getValue() + targetVelocity.getValue()) * dT;
        dA = 0;
    } else {
        dV = targetVelocity.getValue() * Math.cos(MathUtil.angleToRadians(angle)) * dT;
    }

    const newValue = velocityVector.getValue() + dV;
    if (newValue < 0) {
        return new Vector({value: Math.abs(newValue), angle: targetVelocity.getAngle()});
    } else {
        const influence = targetVelocity.getValue() / velocityVector.getValue();
        return new Vector({value: newValue, angle: fixAngle(velocityVector.getAngle() + dA * dT * influence)});
    }
}

function fixAngle(angle) {
    let result = angle;
    if (result < 0) {
        result = 360 + result;
    }
    return result;
}

export default {
    calcVelocityChange
}

export {
    calcVelocityChange
}