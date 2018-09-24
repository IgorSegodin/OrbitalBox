import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

/**
 * @param velocityVector {Vector}
 * @param targetVelocity {Vector}
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

export default {
    calcVelocityChange
}

export {
    calcVelocityChange
}