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
 * Decimal adjustment of a number.
 * https://github.com/jhohlfeld/round10/blob/master/round10.js
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
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
    let angle = firstVector.getAngle() - secondVector.getAngle();

    const sumVal = Math.sqrt(
        Math.pow(firstVector.getValue(), 2) +
        Math.pow(secondVector.getValue(), 2) +
        (2 * firstVector.getValue() * secondVector.getValue() * Math.cos(angleToRadians(angle)))
    );

    const dA = sumVal !== 0 ?
        radiansToAngle(
            Math.acos(
                decimalAdjust(
                    'round',
                    ((Math.pow(sumVal, 2) + Math.pow(firstVector.getValue(), 2) - Math.pow(secondVector.getValue(), 2)) / (2 * sumVal * firstVector.getValue())),
                    -10
                )
            )
        )
        : 0;

    const data = firstVector.getValue() >= secondVector.getValue() ?
        {mainAngle: firstVector.getAngle(), subAngle: secondVector.getAngle()} :
        {mainAngle: secondVector.getAngle(), subAngle: firstVector.getAngle()};

    const sign = Math.abs(angle) >= 180 ? -1 : 1;

    let finalAngle = data.mainAngle > data.subAngle ? data.mainAngle - dA * sign : data.mainAngle + dA * sign;

    const result = new Vector({value: sumVal, angle: fixAngle(finalAngle)});

    if (isNaN(result.getValue()) || isNaN(result.getAngle())) {
        throw new Error(`NaN sumVectors: firstVector ${firstVector} secondVector ${secondVector} result ${result}`);
    }

    return result;
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