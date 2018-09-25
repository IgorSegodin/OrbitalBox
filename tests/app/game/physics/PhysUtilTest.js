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
        assertVectorEquals(new Vector({value: 10, angle: 45}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 90}),
                dT: 0.5
            })
        );
    });

    it('calcVelocityChange test 02', function () {
        assertVectorEquals(new Vector({value: 10, angle: 90}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 90}),
                dT: 1
            })
        );
    });

    it('calcVelocityChange test 03', function () {
        assertVectorEquals(new Vector({value: 10, angle: 90}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 90}),
                dT: 2
            })
        );
    });

    it('calcVelocityChange test 04', function () {
        assertVectorEquals(new Vector({value: 10, angle: 0}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 90}),
                targetVelocity: new Vector({value: 10, angle: 0}),
                dT: 1
            })
        );
    });

    it('calcVelocityChange test 05', function () {
        assertVectorEquals(new Vector({value: 10, angle: 315}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 270}),
                dT: 0.5
            })
        );
    });

    it('calcVelocityChange test 06', function () {
        assertVectorEquals(new Vector({value: 10, angle: 225}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 180}),
                targetVelocity: new Vector({value: 10, angle: 270}),
                dT: 0.5
            })
        );
    });

    it('calcVelocityChange test 07', function () {
        assertVectorEquals(new Vector({value: 10, angle: 225}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 270}),
                targetVelocity: new Vector({value: 10, angle: 180}),
                dT: 0.5
            })
        );
    });

    it('calcVelocityChange test 08', function () {
        assertVectorEquals(new Vector({value: 0, angle: 0}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 180}),
                dT: 0.5
            })
        );
    });

    it('calcVelocityChange test 09', function () {
        assertVectorEquals(new Vector({value: 10, angle: 180}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 10, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 180}),
                dT: 1
            })
        );
    });

    it('calcVelocityChange test 10', function () {
        assertVectorEquals(new Vector({value: 5, angle: 180}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 0, angle: 0}),
                targetVelocity: new Vector({value: 10, angle: 180}),
                dT: 0.5
            })
        );
    });

    it('calcVelocityChange test 11', function () {
        assertVectorEquals(new Vector({value: 55, angle: 272}), PhysUtil.calcVelocityChange({
                velocityVector: new Vector({value: 56, angle: 263}),
                targetVelocity: new Vector({value: 10, angle: 1.6}),
                dT: 0.5
            })
        );
    });


});