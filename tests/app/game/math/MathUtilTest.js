import {assert, expect} from 'chai';

import MathUtil from 'game/math/MathUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

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

describe('MathUtil tests', function () {
    const c = new Point({x: 0, y: 0});

    it('calcAngle test 0', function () {
        assert.equal(0, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 10, y: 0})})));
    });

    it('calcAngle test 22', function () {
        assert.equal(22, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 10, y: 4})})));
    });

    it('calcAngle test 45', function () {
        assert.equal(45, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 10, y: 10})})));
    });

    it('calcAngle test 68', function () {
        assert.equal(68, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 4, y: 10})})));
    });

    it('calcAngle test 90', function () {
        assert.equal(90, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 0, y: 10})})));
    });

    it('calcAngle test 112', function () {
        assert.equal(112, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -4, y: 10})})));
    });

    it('calcAngle test 135', function () {
        assert.equal(135, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -10, y: 10})})));
    });

    it('calcAngle test 158', function () {
        assert.equal(158, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -10, y: 4})})));
    });

    it('calcAngle test 180', function () {
        assert.equal(180, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -10, y: 0})})));
    });

    it('calcAngle test 202', function () {
        assert.equal(202, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -10, y: -4})})));
    });

    it('calcAngle test 225', function () {
        assert.equal(225, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -10, y: -10})})));
    });

    it('calcAngle test 248', function () {
        assert.equal(248, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: -4, y: -10})})));
    });

    it('calcAngle test 270', function () {
        assert.equal(270, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 0, y: -10})})));
    });

    it('calcAngle test 292', function () {
        assert.equal(292, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 4, y: -10})})));
    });

    it('calcAngle test 315', function () {
        assert.equal(315, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 10, y: -10})})));
    });

    it('calcAngle test 338', function () {
        assert.equal(338, Math.round(MathUtil.calcAngle({center: c, point: new Point({x: 10, y: -4})})));
    });

    const v0 = new Vector({value: 10, angle: 0});
    const v45 = new Vector({value: 10, angle: 45});
    const v90 = new Vector({value: 10, angle: 90});
    const v135 = new Vector({value: 10, angle: 135});
    const v180 = new Vector({value: 10, angle: 180});
    const v270 = new Vector({value: 10, angle: 270});

    it('sumVectors test 18-23', function () {
        /* /_ */
        assertVectorEquals(new Vector({value: 18, angle: 23}), MathUtil.sumVectors({
            firstVector: new Vector({value: 10, angle: 0}),
            secondVector: v45
        }));
    });

    it('sumVectors test 11-27', function () {
        /*
         |___
         */
        assertVectorEquals(new Vector({value: 11, angle: 27}), MathUtil.sumVectors({
            firstVector: v0,
            secondVector: new Vector({value: 5, angle: 90})
        }));
    });
    it('sumVectors test 14-45', function () {
        /*
         |_
         */
        assertVectorEquals(new Vector({value: 14, angle: 45}), MathUtil.sumVectors({
            firstVector: v0,
            secondVector: v90
        }));
    });
    it('sumVectors test 8-67', function () {
        /*
         \_
         */
        assertVectorEquals(new Vector({value: 8, angle: 67}), MathUtil.sumVectors({
            firstVector: v0,
            secondVector: new Vector({value: 10, angle: 133})
        }));
    });
    it('sumVectors test 0-90', function () {
        /* _ _ */
        assertVectorEquals(new Vector({value: 0, angle: 0}), MathUtil.sumVectors({
            firstVector: v0,
            secondVector: v180
        }));
    });
    it('sumVectors test 8-293', function () {
        /*
          __
         /
         */
        assertVectorEquals(new Vector({value: 8, angle: 293}), MathUtil.sumVectors({
            firstVector: v0,
            secondVector: new Vector({value: 10, angle: 225})
        }));
    });
    it('sumVectors test 14-315', function () {
        /*
          _
         |
         */
        assertVectorEquals(new Vector({value: 14, angle: 315}), MathUtil.sumVectors({
            firstVector: v0,
            secondVector: v270
        }));
    });
    it('sumVectors test 14-135', function () {
        /*
         _|
         */
        assertVectorEquals(new Vector({value: 14, angle: 135}), MathUtil.sumVectors({
            firstVector: v90,
            secondVector: v180
        }));
    });
    it('sumVectors test 0-180', function () {
        /*
         |
         |
         */
        assertVectorEquals(new Vector({value: 0, angle: 180}), MathUtil.sumVectors({
            firstVector: v90,
            secondVector: v270
        }));
    });
    it('sumVectors test 14-225', function () {
        /*
         _
          |
         */
        assertVectorEquals(new Vector({value: 14, angle: 225}), MathUtil.sumVectors({
            firstVector: v180,
            secondVector: v270
        }));
    });

    it('polarToCartesian test 01', function () {
        assertPointEquals(new Point({x: 10, y: 0}), MathUtil.polarToCartesian({center: c, vector: v0}));
    });

    it('polarToCartesian test 02', function () {
        assertPointEquals(new Point({x: 7, y: 7}), MathUtil.polarToCartesian({center: c, vector: v45}));
    });

    it('polarToCartesian test 03', function () {
        assertPointEquals(new Point({x: 0, y: 10}), MathUtil.polarToCartesian({center: c, vector: v90}));
    });

    it('polarToCartesian test 04', function () {
        assertPointEquals(new Point({x: -10, y: 0}), MathUtil.polarToCartesian({center: c, vector: v180}));
    });

    it('polarToCartesian test 05', function () {
        assertPointEquals(new Point({x: 0, y: -10}), MathUtil.polarToCartesian({center: c, vector: v270}));
    });

});