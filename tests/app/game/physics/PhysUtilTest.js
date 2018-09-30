import {assert, expect} from 'chai';

import PhysUtil from 'game/physics/PhysUtil';
import PlanetConstants from 'game/physics/PlanetConstants';

describe('PhysUtil tests', function () {

    it('calcGravityForce, calcGravityAcceleration test 01', function () {
        const m2 = 6.53; // my mass
        const F = PhysUtil.calcGravityForce({
            m1: PlanetConstants.EARTH_MASS,
            m2: m2,
            distance: PlanetConstants.EARTH_RADIUS
        });

        const g = PhysUtil.calcGravityAcceleration({force: F, m2: m2});

        assert.equal(9.8, g.toFixed(1));
    });

    it('calcApsisVelocity test 01', function () {
        assert.equal(PlanetConstants.EARTH_AROUND_SUN_PERIAPSIS_VELOCITY, PhysUtil.calcApsisVelocity({
            mass: PlanetConstants.SUN_MASS,
            apsisRadius: PlanetConstants.EARTH_AROUND_SUN_PERIAPSIS,
            otherApsisRadius: PlanetConstants.EARTH_AROUND_SUN_APOAPSIS
        }));
    });
});