import Point from 'game/math/Point';
import Vector from 'game/math/Vector';

function angleToRadians(angle) {
    return angle * Math.PI / 180;
}

function radiansToAngle(radians) {
    return radians * 180 / Math.PI;
}

function fixAngle(angle) {
    let result = angle;
    if (result < 0) {
        result = 360 + result;
    }
    return result % 360;
}

/**
 * @param center {Point}
 * @param point {Point}
 * @return {Number} counter clockwise from positive X axis, degrees
 * @deprecated use {@link #calcDistance}
 */
function calcAngle({center, point}) {
    return calcDistance({center, point}).getAngle();
}

/**
 * @param center {Point}
 * @param point {Point}
 * @return {Vector} distance and angle between two points
 */
function calcDistance({center, point}) {
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
    angle = Math.abs(angle) + 90 * (plane - 1);

    return new Vector({value: c, angle: angle});
}

/**
 * @param firstVector {Vector}
 * @param secondVector {Vector}
 * @return {Vector}
 */
function sumVectors({firstVector, secondVector}) {
    secondVector = new Vector({value: secondVector.getValue(), angle: 360 + secondVector.getAngle()});


    let angle = fixAngle(secondVector.getAngle() - firstVector.getAngle());

    const sumVal = Math.sqrt(
        Math.pow(firstVector.getValue(), 2) +
        Math.pow(secondVector.getValue(), 2) +
        (2 * firstVector.getValue() * secondVector.getValue() * Math.cos(angleToRadians(angle)))
    );

    let resultAngle;

    if (sumVal === 0) {
        resultAngle = firstVector.getAngle();
    } else {
        resultAngle = radiansToAngle(Math.acos(
            (Math.pow(sumVal, 2) + Math.pow(firstVector.getValue(), 2) - Math.pow(secondVector.getValue(), 2)) / (2 * sumVal * firstVector.getValue())
        ));
    }

    resultAngle += angle <= 180 ? firstVector.getAngle() : secondVector.getAngle();

    return new Vector({value: sumVal, angle: fixAngle(resultAngle)});
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

export default {
    angleToRadians,
    calcAngle,
    calcDistance,
    sumVectors,
    polarToCartesian
}

export {
    angleToRadians,
    calcAngle,
    calcDistance,
    sumVectors,
    polarToCartesian
}