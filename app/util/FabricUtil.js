// TODO move to fabric package

import {fabric} from 'fabric';
import Point from 'game/math/Point';

function Rgba(red, green, blue, alpha) {
    let r = Math.round(+red);
    let g = Math.round(+green);
    let b = Math.round(+blue);
    let a = +alpha;

    this.getRed = function () {
        return r;
    };
    this.setRed = function (value) {
        r = value;
    };
    this.getGreen = function () {
        return g;
    };
    this.setGreen = function (value) {
        g = value;
    };
    this.getBlue = function () {
        return b;
    };
    this.setBlue = function (value) {
        b = value;
    };
    this.getAlpha = function () {
        return a;
    };
    this.setAlpha = function (value) {
        a = value;
    };
    this.toString = function () {
        return `rgba(${r},${g},${b},${a})`;
    };
    this.copy = function () {
        return new Rgba(r, g, b, a);
    }
}

/**
 * @param imageUrl {String}
 * @return {Object} fabric image object
 */
function promiseImage(imageUrl) {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(imageUrl, (image) => {
            resolve(image);
        });
    });
}

function promiseRawImage(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            resolve(img);
        };
        img.src = imageUrl;
    });
}

/**
 * @param obj1 {Object}
 * @param obj2 {Object}
 * @param tolerance {Number} possible delta, when object is treated as still not intersected
 * @return {Boolean} true, if objects intersect with each other
 */
function isIntersected(obj1, obj2, tolerance = 0) {
    const x1 = obj1.get('left') + (obj1.getWidth() / 2);
    const y1 = obj1.get('top') + (obj1.getHeight() / 2);
    const w1 = obj1.getWidth();
    const h1 = obj1.getHeight();

    const x2 = obj2.get('left') + (obj2.getWidth() / 2);
    const y2 = obj2.get('top') + (obj2.getHeight() / 2);
    const w2 = obj2.getWidth();
    const h2 = obj2.getHeight();

    return Math.abs(x1 - x2) + tolerance <= w1 / 2 + w2 / 2 &&
        Math.abs(y1 - y2) + tolerance <= h1 / 2 + h2 / 2;
}

function containPoint({x, y}, targetObj) {
    // let point = new fabric.Point(x, y);
    // return targetObj.containsPoint(point);
    const x1 = targetObj.get('left');
    const y1 = targetObj.get('top');
    const x2 = x1 + targetObj.getWidth();
    const y2 = y1 + targetObj.getHeight();

    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

/**
 * @param valueString {String} text like: rgba(255,255,255,1)
 * @return {Object} wrapped RGBA values
 */
function parseRgba(valueString) {
    const expression = /^\s*rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/gi;

    const result = expression.exec(valueString);

    if (!result) {
        throw new Error(`Unexpected input: ${valueString}`);
    }

    return new Rgba(result[1], result[2], result[3], result[4]);
}

/**
 * @param object
 * @param world
 * @return {Point}
 */
function getObjectPoint({object, world}) {
    const top = object.get("top");
    const left = object.get("left");
    const width = object.getWidth();
    const height = object.getHeight();

    return new Point({
        x: left + width / 2,
        y: world.height - top - height / 2
    });
}

/**
 * @param point {Point}
 * @param object {Object}
 * @param world {Object}
 */
function setObjectPoint({point, object, world}) {
    object.set({
        left: point.getX() - object.getWidth() / 2,
        top: world.height - point.getY() - object.getHeight() / 2
    });
}

function pixelToMeter(pixels) {
    return pixels * Math.pow(10, 6);
}

function meterToPixel(meters) {
    return meters * Math.pow(10, -6);
}

/**
 * Converts to Fabric angles: west - 270, north - 0, east - 90, south - 180
 * @param originAngle {Number} west - 0, north - 90, east - 180, south - 270
 */
function convertAngle(originAngle) {
    const fabricAngle = -originAngle + 90;
    return fabricAngle % 360;
}

export {
    pixelToMeter,
    meterToPixel,
    convertAngle,
    setObjectPoint,
    promiseImage,
    promiseRawImage,
    isIntersected,
    containPoint,
    Rgba,
    parseRgba
}