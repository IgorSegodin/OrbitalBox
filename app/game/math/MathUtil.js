import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

function angleToRadians(angle) {
    return angle * Math.PI / 180;
}

function radiansToAngle(radians) {
    return radians * 180 / Math.PI;
}

/**
 * @param center {Point}
 * @param point {Point}
 * @return {Number} counter clockwise from positive X axis, degrees
 */
function calcAngle({center, point}) {
    const b = point.getX() - center.getX();
    const a = point.getY() - center.getY();
    const c = Math.sqrt(b * b + a * a);

    let plane = 1;

    if (a >= 0 && b < 0) {
        plane = 2;
    } else if (b <= 0 && a < 0) {
        plane = 3;
    } else if (a < 0 && b > 0) {
        plane = 4;
    }

    let angle = radiansToAngle(Math.asin((plane === 1 || plane === 3 ? a : b) / c));

    return Math.abs(angle) + 90 * (plane - 1);
}

/**
 * @param firstVector {Vector}
 * @param secondVector {Vector}
 * @return {Vector}
 */
function sumVectors({firstVector, secondVector}) {
    // first always has smaller angle
    if (firstVector.getAngle() > secondVector.getAngle()) {
        const tmp = secondVector;
        secondVector = firstVector;
        firstVector = tmp;
    }

    let angle = secondVector.getAngle() - firstVector.getAngle();

    const sumVal = Math.sqrt(
        Math.pow(firstVector.getValue(), 2) +
        Math.pow(secondVector.getValue(), 2) +
        (2 * firstVector.getValue() * secondVector.getValue() * Math.cos(angleToRadians(angle)))
    );

    let resultAngle;

    if (sumVal === 0) {
        resultAngle = 90;
    } else {
        resultAngle = radiansToAngle(Math.acos(
            (Math.pow(sumVal, 2) + Math.pow(firstVector.getValue(), 2) - Math.pow(secondVector.getValue(), 2)) / (2 * sumVal * firstVector.getValue())
        ));
    }

    resultAngle += angle <= 180 ? firstVector.getAngle() : secondVector.getAngle();

    return new Vector({value: sumVal, angle: resultAngle});
}

/**
 * @param center {Point}
 * @param vector {Vector}
 * @return {Point}
 */
function polarToCartesian({center, vector}) {
    return new Point({
        x: center.getX() + vector.getValue() * Math.cos(angleToRadians(vector.getAngle())),
        y: center.getY() + vector.getValue() * Math.sin(angleToRadians(vector.getAngle()))
    });
}

// TODO move tests to the right place.
/*----------------- Testing -----------------*/

function assertEquals(expected, real) {
    if (expected !== real) {
        throw new Error(`Got ${real}, expected ${expected}`);
    }
}

function assertVectorEquals(expected, real) {
    const equal = Math.round(expected.getValue()) === Math.round(real.getValue()) &&
        Math.round(expected.getAngle()) === Math.round(real.getAngle());

    if (!equal) {
        throw new Error(`Got ${real}, expected ${expected}`);
    }
}

function assertPointEquals(expected, real) {
    const equal = Math.round(expected.getX()) === Math.round(real.getX()) &&
        Math.round(expected.getY()) === Math.round(real.getY());

    if (!equal) {
        throw new Error(`Got ${real}, expected ${expected}`);
    }
}

const c = new Point({x: 0, y: 0});

assertEquals(0, Math.round(calcAngle({center: c, point: new Point({x: 10, y: 0})})));
assertEquals(22, Math.round(calcAngle({center: c, point: new Point({x: 10, y: 4})})));
assertEquals(45, Math.round(calcAngle({center: c, point: new Point({x: 10, y: 10})})));
assertEquals(68, Math.round(calcAngle({center: c, point: new Point({x: 4, y: 10})})));
assertEquals(90, Math.round(calcAngle({center: c, point: new Point({x: 0, y: 10})})));
assertEquals(112, Math.round(calcAngle({center: c, point: new Point({x: -4, y: 10})})));
assertEquals(135, Math.round(calcAngle({center: c, point: new Point({x: -10, y: 10})})));
assertEquals(158, Math.round(calcAngle({center: c, point: new Point({x: -10, y: 4})})));
assertEquals(180, Math.round(calcAngle({center: c, point: new Point({x: -10, y: 0})})));
assertEquals(202, Math.round(calcAngle({center: c, point: new Point({x: -10, y: -4})})));
assertEquals(225, Math.round(calcAngle({center: c, point: new Point({x: -10, y: -10})})));
assertEquals(248, Math.round(calcAngle({center: c, point: new Point({x: -4, y: -10})})));
assertEquals(270, Math.round(calcAngle({center: c, point: new Point({x: 0, y: -10})})));
assertEquals(292, Math.round(calcAngle({center: c, point: new Point({x: 4, y: -10})})));
assertEquals(315, Math.round(calcAngle({center: c, point: new Point({x: 10, y: -10})})));
assertEquals(338, Math.round(calcAngle({center: c, point: new Point({x: 10, y: -4})})));

const v0 = new Vector({value: 10, angle: 0});
const v45 = new Vector({value: 10, angle: 45});
const v90 = new Vector({value: 10, angle: 90});
const v135 = new Vector({value: 10, angle: 135});
const v180 = new Vector({value: 10, angle: 180});
const v270 = new Vector({value: 10, angle: 270});
const v315 = new Vector({value: 10, angle: 315});

/* /_ */
assertVectorEquals(new Vector({value: 18, angle: 23}), sumVectors({
    firstVector: new Vector({value: 10, angle: 0}),
    secondVector: v45
}));
/*
    |___
*/
assertVectorEquals(new Vector({value: 11, angle: 27}), sumVectors({
    firstVector: v0,
    secondVector: new Vector({value: 5, angle: 90})
}));
/*
    |_
*/
assertVectorEquals(new Vector({value: 14, angle: 45}), sumVectors({
    firstVector: v0,
    secondVector: v90
}));
/*
    \_
*/
assertVectorEquals(new Vector({value: 8, angle: 68}), sumVectors({
    firstVector: v0,
    secondVector: v135
}));
/* _ _ */
assertVectorEquals(new Vector({value: 0, angle: 90}), sumVectors({
    firstVector: v0,
    secondVector: v180
}));
/*
    __
   /
*/
assertVectorEquals(new Vector({value: 8, angle: 293}), sumVectors({
    firstVector: v0,
    secondVector: new Vector({value: 10, angle: 225})
}));
/*
     _
    |
*/
assertVectorEquals(new Vector({value: 14, angle: 315}), sumVectors({
    firstVector: v0,
    secondVector: v270
}));
/*
    _|
*/
assertVectorEquals(new Vector({value: 14, angle: 135}), sumVectors({
    firstVector: v90,
    secondVector: v180
}));
/*
    |
    |
*/
assertVectorEquals(new Vector({value: 0, angle: 180}), sumVectors({
    firstVector: v90,
    secondVector: v270
}));
/*
   _
    |
*/
assertVectorEquals(new Vector({value: 14, angle: 225}), sumVectors({
    firstVector: v180,
    secondVector: v270
}));


assertPointEquals(new Point({x: 10, y: 0}), polarToCartesian({center: c, vector: v0}));
assertPointEquals(new Point({x: 7, y: 7}), polarToCartesian({center: c, vector: v45}));
assertPointEquals(new Point({x: 0, y: 10}), polarToCartesian({center: c, vector: v90}));
assertPointEquals(new Point({x: -10, y: 0}), polarToCartesian({center: c, vector: v180}));
assertPointEquals(new Point({x: 0, y: -10}), polarToCartesian({center: c, vector: v270}));


/*----------------- End testing -----------------*/

export default {
    angleToRadians,
    calcAngle,
    sumVectors,
    polarToCartesian
}

export {
    angleToRadians,
    calcAngle,
    sumVectors,
    polarToCartesian
}