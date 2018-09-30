const GRAVITATIONAL_CONSTANT = 6.67408 * Math.pow(10, -11); // (m^3 / (kg * sec^2))

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

/**
 * Calc velocity in extreme orbit points.
 *
 * Perigee velocity
 * Vp = Math.sqrt( (2 * G * M * Ra) / (Rp * (Ra + Rp) ))
 *
 * Apogee velocity
 * Va = Math.sqrt( (2 * G * M * Rp) / (Ra * (Ra + Rp) ))
 *
 * @param mass {Number} (m) orbit around planet mass,
 * @param apsisRadius {Number} (m) distance in apsis, for which velocity is calculated
 * @param otherApsisRadius {Number} (m) opposite apsis
 * @return {number}
 */
function calcApsisVelocity({mass, apsisRadius, otherApsisRadius}) {
    return Math.sqrt((2 * GRAVITATIONAL_CONSTANT * mass * otherApsisRadius) / (apsisRadius * (otherApsisRadius + apsisRadius)))
}

export default {
    GRAVITATIONAL_CONSTANT,

    calcGravityForce,
    calcGravityAcceleration,
    calcApsisVelocity
}

export {
    calcGravityForce,
    calcGravityAcceleration,
    calcApsisVelocity
}