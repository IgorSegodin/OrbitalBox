const GRAVITATIONAL_CONSTANT = 6.67408 * Math.pow(10, -11); // (m^3 / (kg * sec^2))

const EARTH_MASS = 5.972 * Math.pow(10, 24); // (kg)
const EARTH_RADIUS = 6.371 * Math.pow(10, 6); // (m)

const EARTH_TO_MOON_DISTANCE = 384.4 * Math.pow(10, 6); // (m)

const MOON_MASS = 7.34767309 * Math.pow(10, 22); // (kg)
const MOON_RADIUS = 1.737 * Math.pow(10, 6); // (m)
const MOON_VELOCITY_AROUND_EARTH = 1022; // (m/sec)

/**
 * F = G * m1 * m2 / r^2
 * @param m1 {Number} mass of first object (kg)
 * @param m2 {Number} mass of second object (kg)
 * @param distance {Number} between centers of mass (m)
 * @return {number} force value (kg*m/sec^2)
 */
function calcGravityForce({m1, m2 = 1, distance}) {
    return GRAVITATIONAL_CONSTANT * m1 * m2 / Math.pow(distance, 2);
}

/**
 * g = F / m
 * @param force {Number} (kg*m/sec^2)
 * @param m2 {Number} (kg)
 * @return {Number} (m/sec^2)
 */
function calcGravityAcceleration({force, m2}) {
    return force / m2;
}

export default {
    calcGravityForce,
    calcGravityAcceleration,
    EARTH_MASS,
    EARTH_RADIUS,
    EARTH_TO_MOON_DISTANCE,
    MOON_MASS,
    MOON_RADIUS,
    MOON_VELOCITY_AROUND_EARTH
}

export {
    calcGravityForce,
    calcGravityAcceleration
}