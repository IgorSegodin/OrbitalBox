import {assert, expect} from 'chai';

import PhysUtil from 'game/physics/PhysUtil';

describe('PhysUtil tests', function () {

    it('calcGravityForce, calcGravityAcceleration test 01', function () {
        const m2 = 6.53; // my mass
        const F = PhysUtil.calcGravityForce({
            m1: PhysUtil.EARTH_MASS,
            m2: m2,
            distance: PhysUtil.EARTH_RADIUS
        });

        const g = PhysUtil.calcGravityAcceleration({force: F, m2: m2});

        assert.equal(9.8, g.toFixed(1));
    });
});