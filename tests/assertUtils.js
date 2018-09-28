import {assert, expect} from 'chai';

function assertVectorEquals(expected, real) {
    const equal = Math.round(expected.getValue()) === Math.round(real.getValue()) &&
        Math.round(expected.getAngle()) === Math.round(real.getAngle());
    assert.isOk(equal, `Got ${real}, expected ${expected}`);
}

function assertPointEquals(expected, real) {
    const equal = Math.round(expected.getX()) === Math.round(real.getX()) &&
        Math.round(expected.getY()) === Math.round(real.getY());
    assert.isOk(equal, `Got ${real}, expected ${expected}`);
}

export {
    assertVectorEquals,
    assertPointEquals
}