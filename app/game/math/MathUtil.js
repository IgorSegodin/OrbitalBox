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