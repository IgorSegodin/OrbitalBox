import PhysUtil from "game/physics/PhysUtil";

const SUN_MASS = 1.989 * Math.pow(10, 30); // (kg)
const SUN_RADIUS = 696.392 * Math.pow(10, 6); // (m)

const EARTH_MASS = 5.972 * Math.pow(10, 24); // (kg)
const EARTH_RADIUS = 6.371 * Math.pow(10, 6); // (m)
const EARTH_AROUND_SUN_PERIAPSIS = 147097.233 * Math.pow(10, 6); // (m)
const EARTH_AROUND_SUN_PERIAPSIS_VELOCITY = 30290.64701605207; // (m/sec)
const EARTH_AROUND_SUN_APOAPSIS = 152095.566 * Math.pow(10, 6); // (m)
const EARTH_AROUND_SUN_APOAPSIS_VELOCITY = 29295.202214119552; // (m/sec)

const MOON_MASS = 7.34767309 * Math.pow(10, 22); // (kg)
const MOON_RADIUS = 1.737 * Math.pow(10, 6); // (m)
const MOON_AROUND_EARTH_PERIAPSIS = 366.392 * Math.pow(10, 6); // (m)
const MOON_AROUND_EARTH_PERIAPSIS_VELOCITY = 1068.3; // (m/sec)
const MOON_AROUND_EARTH_APOAPSIS = 404.227 * Math.pow(10, 6); // (m)
const MOON_AROUND_EARTH_APOAPSIS_VELOCITY = 968.3; // (m/sec)

const MERCURY_MASS = 3.285 * Math.pow(10, 23); // (kg)
const MERCURY_RADIUS = 2.44 * Math.pow(10, 6); // (m)
const MERCURY_AROUND_SUN_PERIAPSIS = 46001.2 * Math.pow(10, 6); // (m)
const MERCURY_AROUND_SUN_APOAPSIS = 69816.9 * Math.pow(10, 6); // (m)
const MERCURY_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: MERCURY_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: MERCURY_AROUND_SUN_APOAPSIS
});

const VENUS_MASS = 4.8675 * Math.pow(10, 24); // (kg)
const VENUS_RADIUS = 6.0518 * Math.pow(10, 6); // (m)
const VENUS_AROUND_SUN_PERIAPSIS = 107477 * Math.pow(10, 6); // (m)
const VENUS_AROUND_SUN_APOAPSIS = 108939 * Math.pow(10, 6); // (m)
const VENUS_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: VENUS_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: VENUS_AROUND_SUN_APOAPSIS
});

const MARS_MASS = 6.4171 * Math.pow(10, 23); // (kg)
const MARS_RADIUS = 3.3895 * Math.pow(10, 6); // (m)
const MARS_AROUND_SUN_PERIAPSIS = 206700 * Math.pow(10, 6); // (m)
const MARS_AROUND_SUN_APOAPSIS = 249200 * Math.pow(10, 6); // (m)
const MARS_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: MARS_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: MARS_AROUND_SUN_APOAPSIS
});

const JUPITER_MASS = 1.8982 * Math.pow(10, 27); // (kg)
const JUPITER_RADIUS = 69.911 * Math.pow(10, 6); // (m)
const JUPITER_AROUND_SUN_PERIAPSIS = 740520 * Math.pow(10, 6); // (m)
const JUPITER_AROUND_SUN_APOAPSIS = 816620 * Math.pow(10, 6); // (m)
const JUPITER_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: JUPITER_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: JUPITER_AROUND_SUN_APOAPSIS
});

const SATURN_MASS = 5.6834 * Math.pow(10, 26); // (kg)
const SATURN_RADIUS = 58.232 * Math.pow(10, 6); // (m)
const SATURN_AROUND_SUN_PERIAPSIS = 1352550 * Math.pow(10, 6); // (m)
const SATURN_AROUND_SUN_APOAPSIS = 1514500 * Math.pow(10, 6); // (m)
const SATURN_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: SATURN_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: SATURN_AROUND_SUN_APOAPSIS
});

const URANUS_MASS = 8.6810 * Math.pow(10, 25); // (kg)
const URANUS_RADIUS = 25.362 * Math.pow(10, 6); // (m)
const URANUS_AROUND_SUN_PERIAPSIS = 2742000 * Math.pow(10, 6); // (m)
const URANUS_AROUND_SUN_APOAPSIS = 3008000 * Math.pow(10, 6); // (m)
const URANUS_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: URANUS_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: URANUS_AROUND_SUN_APOAPSIS
});

const NEPTUNE_MASS = 1.0243 * Math.pow(10, 26); // (kg)
const NEPTUNE_RADIUS = 24.622 * Math.pow(10, 6); // (m)
const NEPTUNE_AROUND_SUN_PERIAPSIS = 4460000 * Math.pow(10, 6); // (m)
const NEPTUNE_AROUND_SUN_APOAPSIS = 4540000 * Math.pow(10, 6); // (m)
const NEPTUNE_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: NEPTUNE_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: NEPTUNE_AROUND_SUN_APOAPSIS
});

const PLUTO_MASS = 1.303 * Math.pow(10, 22); // (kg)
const PLUTO_RADIUS = 1.1883 * Math.pow(10, 6); // (m)
const PLUTO_AROUND_SUN_PERIAPSIS = 4436820 * Math.pow(10, 6); // (m)
const PLUTO_AROUND_SUN_APOAPSIS = 7375930 * Math.pow(10, 6); // (m)
const PLUTO_AROUND_SUN_PERIAPSIS_VELOCITY = PhysUtil.calcApsisVelocity({
    mass: SUN_MASS,
    apsisRadius: PLUTO_AROUND_SUN_PERIAPSIS,
    otherApsisRadius: PLUTO_AROUND_SUN_APOAPSIS
});

export default {

    EARTH_MASS,
    EARTH_RADIUS,
    EARTH_AROUND_SUN_PERIAPSIS,
    EARTH_AROUND_SUN_PERIAPSIS_VELOCITY,
    EARTH_AROUND_SUN_APOAPSIS,
    EARTH_AROUND_SUN_APOAPSIS_VELOCITY,

    MOON_MASS,
    MOON_RADIUS,
    MOON_AROUND_EARTH_PERIAPSIS,
    MOON_AROUND_EARTH_PERIAPSIS_VELOCITY,
    MOON_AROUND_EARTH_APOAPSIS,
    MOON_AROUND_EARTH_APOAPSIS_VELOCITY,

    SUN_MASS,
    SUN_RADIUS,

    MERCURY_MASS,
    MERCURY_RADIUS,
    MERCURY_AROUND_SUN_PERIAPSIS,
    MERCURY_AROUND_SUN_PERIAPSIS_VELOCITY,

    VENUS_MASS,
    VENUS_RADIUS,
    VENUS_AROUND_SUN_PERIAPSIS,
    VENUS_AROUND_SUN_PERIAPSIS_VELOCITY,

    MARS_MASS,
    MARS_RADIUS,
    MARS_AROUND_SUN_PERIAPSIS,
    MARS_AROUND_SUN_PERIAPSIS_VELOCITY,

    JUPITER_MASS,
    JUPITER_RADIUS,
    JUPITER_AROUND_SUN_PERIAPSIS,
    JUPITER_AROUND_SUN_PERIAPSIS_VELOCITY,

    SATURN_MASS,
    SATURN_RADIUS,
    SATURN_AROUND_SUN_PERIAPSIS,
    SATURN_AROUND_SUN_PERIAPSIS_VELOCITY,

    URANUS_MASS,
    URANUS_RADIUS,
    URANUS_AROUND_SUN_PERIAPSIS,
    URANUS_AROUND_SUN_PERIAPSIS_VELOCITY,

    NEPTUNE_MASS,
    NEPTUNE_RADIUS,
    NEPTUNE_AROUND_SUN_PERIAPSIS,
    NEPTUNE_AROUND_SUN_PERIAPSIS_VELOCITY,

    PLUTO_MASS,
    PLUTO_RADIUS,
    PLUTO_AROUND_SUN_PERIAPSIS,
    PLUTO_AROUND_SUN_PERIAPSIS_VELOCITY,
}

export {

    EARTH_MASS,
    EARTH_RADIUS,
    EARTH_AROUND_SUN_PERIAPSIS,
    EARTH_AROUND_SUN_PERIAPSIS_VELOCITY,
    EARTH_AROUND_SUN_APOAPSIS,
    EARTH_AROUND_SUN_APOAPSIS_VELOCITY,

    MOON_MASS,
    MOON_RADIUS,
    MOON_AROUND_EARTH_PERIAPSIS,
    MOON_AROUND_EARTH_PERIAPSIS_VELOCITY,
    MOON_AROUND_EARTH_APOAPSIS,
    MOON_AROUND_EARTH_APOAPSIS_VELOCITY,

    SUN_MASS,
    SUN_RADIUS,

    MERCURY_MASS,
    MERCURY_RADIUS,
    MERCURY_AROUND_SUN_PERIAPSIS,
    MERCURY_AROUND_SUN_PERIAPSIS_VELOCITY,

    VENUS_MASS,
    VENUS_RADIUS,
    VENUS_AROUND_SUN_PERIAPSIS,
    VENUS_AROUND_SUN_PERIAPSIS_VELOCITY,

    MARS_MASS,
    MARS_RADIUS,
    MARS_AROUND_SUN_PERIAPSIS,
    MARS_AROUND_SUN_PERIAPSIS_VELOCITY,

    JUPITER_MASS,
    JUPITER_RADIUS,
    JUPITER_AROUND_SUN_PERIAPSIS,
    JUPITER_AROUND_SUN_PERIAPSIS_VELOCITY,

    SATURN_MASS,
    SATURN_RADIUS,
    SATURN_AROUND_SUN_PERIAPSIS,
    SATURN_AROUND_SUN_PERIAPSIS_VELOCITY,

    URANUS_MASS,
    URANUS_RADIUS,
    URANUS_AROUND_SUN_PERIAPSIS,
    URANUS_AROUND_SUN_PERIAPSIS_VELOCITY,

    NEPTUNE_MASS,
    NEPTUNE_RADIUS,
    NEPTUNE_AROUND_SUN_PERIAPSIS,
    NEPTUNE_AROUND_SUN_PERIAPSIS_VELOCITY,

    PLUTO_MASS,
    PLUTO_RADIUS,
    PLUTO_AROUND_SUN_PERIAPSIS,
    PLUTO_AROUND_SUN_PERIAPSIS_VELOCITY,
}