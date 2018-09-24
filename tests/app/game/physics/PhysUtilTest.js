import {assert, expect} from 'chai';

import PhysUtil from 'game/physics/PhysUtil';
import Vector from 'game/math/Vector';

function assertVectorEquals(expected, real) {
    const equal = Math.round(expected.getValue()) === Math.round(real.getValue()) &&
        Math.round(expected.getAngle()) === Math.round(real.getAngle());
    assert.isOk(equal, `Got ${real}, expected ${expected}`);
}

describe('PhysUtil tests', function () {

    it('calcVelocityChange test 01', function () {
        // TODO write tests
        assertVectorEquals(new Vector({value: 10, angle: 45}),
            PhysUtil.calcVelocityChange({velocityVector: new Vector({value: 10, angle: 0}), targetVelocity: new Vector({value: 10, angle: 90}), dT: 0.5})
        );
    });
});