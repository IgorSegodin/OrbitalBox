const GRAVITATIONAL_CONSTANT = 6.67408 * Math.pow(10, -11); // (m^3 / (kg * sec^2))

const EARTH_MASS = 5.972 * Math.pow(10, 24); // (kg)
const EARTH_RADIUS = 6.371 * Math.pow(10, 6); // (m)

const MOON_MASS = 7.34767309 * Math.pow(10, 22); // (kg)
const MOON_RADIUS = 1.737 * Math.pow(10, 6); // (m)

const MOON_AROUND_EARTH_PERIGEE = 366.392 * Math.pow(10, 6); // (m)
const MOON_AROUND_EARTH_PERIGEE_VELOCITY = 1068.3; // (m/sec)
const MOON_AROUND_EARTH_APOGEE = 404.227 * Math.pow(10, 6); // (m)
const MOON_AROUND_EARTH_APOGEE_VELOCITY = 968.3; // (m/sec)

/*

Perigee velocity
Vp = Math.sqrt( (2 * G * M * Ra) / (Rp * (Ra + Rp) ))

Apogee velocity
Va = Math.sqrt( (2 * G * M * Rp) / (Ra * (Ra + Rp) ))

 */


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
    GRAVITATIONAL_CONSTANT,
    EARTH_MASS,
    EARTH_RADIUS,
    MOON_MASS,
    MOON_RADIUS,
    MOON_AROUND_EARTH_PERIGEE,
    MOON_AROUND_EARTH_PERIGEE_VELOCITY,
    MOON_AROUND_EARTH_APOGEE,
    MOON_AROUND_EARTH_APOGEE_VELOCITY,

    calcGravityForce,
    calcGravityAcceleration
}

export {
    calcGravityForce,
    calcGravityAcceleration
}