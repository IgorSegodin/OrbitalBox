import {assert, expect} from 'chai';

import {assertPointEquals, assertVectorEquals} from 'assertUtils';

import MathUtil from 'game/math/MathUtil';
import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

describe('MathUtil tests', function () {
    const c = new Point({x: 0, y: 0});

    it('calcDistance test 0', function () {
        assertVectorEquals(new Vector({value: 10, angle: 0}), MathUtil.calcDistance({center: c, point: new Point({x: 10, y: 0})}));
    });

    it('calcDistance test 22', function () {
        assertVectorEquals(new Vector({value: 11, angle: 22}), MathUtil.calcDistance({center: c, point: new Point({x: 10, y: 4})}));
    });

    it('calcDistance test 45', function () {
        assertVectorEquals(new Vector({value: 14, angle: 45}), MathUtil.calcDistance({center: c, point: new Point({x: 10, y: 10})}));
    });

    it('calcDistance test 68', function () {
        assertVectorEquals(new Vector({value: 11, angle: 68}), MathUtil.calcDistance({center: c, point: new Point({x: 4, y: 10})}));
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

    it('sumVectors test 42-20', function () {
        /* /_ */
        assertVectorEquals(new Vector({value: 42, angle: 20}), MathUtil.sumVectors({
            firstVector: new Vector({value: 20, angle: 0}),
            secondVector: new Vector({value: 25, angle: 45})
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
    it('sumVectors test 0-90', function () {
        /*
         |
         |
         */
        assertVectorEquals(new Vector({value: 0, angle: 90}), MathUtil.sumVectors({
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

    it('sumVectors test 01', function () {
        assertVectorEquals(new Vector({value: 55, angle: 273}), MathUtil.sumVectors({
            firstVector: new Vector({value: 56, angle: 263}),
            secondVector: new Vector({value: 10, angle: 1.6})
        }));
    });

    it('sumVectors test 02', function () {
        assertVectorEquals(new Vector({value: 32, angle: 252}), MathUtil.sumVectors({
            firstVector: new Vector({value: 30, angle: 270}),
            secondVector: new Vector({value: 10, angle: 180})
        }));
    });

    it('sumVectors test 03', function () {
        assertVectorEquals(new Vector({value: 636, angle: 215}), MathUtil.sumVectors({
            firstVector: new Vector({value: 636.2131416366695, angle: 214.6721779174062}),
            secondVector: new Vector({value: 0.01280536401042475, angle: 34.65277064524722})
        }));
    });

    it('polarToCartesian test 01', function () {
        assertPointEquals(new Point({x: 10, y: 0}), MathUtil.polarToCartesian({center: c, vector: new Vector({value: 10, angle: 0})}));
    });

    it('polarToCartesian test 02', function () {
        assertPointEquals(new Point({x: 7, y: 7}), MathUtil.polarToCartesian({center: c, vector: new Vector({value: 10, angle: 45})}));
    });

    it('polarToCartesian test 03', function () {
        assertPointEquals(new Point({x: 0, y: 10}), MathUtil.polarToCartesian({center: c, vector: new Vector({value: 10, angle: 90})}));
    });

    it('polarToCartesian test 04', function () {
        assertPointEquals(new Point({x: -10, y: 0}), MathUtil.polarToCartesian({center: c, vector: new Vector({value: 10, angle: 180})}));
    });

    it('polarToCartesian test 05', function () {
        assertPointEquals(new Point({x: 0, y: -10}), MathUtil.polarToCartesian({center: c, vector: new Vector({value: 10, angle: 270})}));
    });

});