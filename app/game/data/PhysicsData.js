import Vector from "game/math/Vector";

/**
 * Holds all physical properties of an Object
 */
class PhysicsData {

    /**
     * @param mass {Number} (kg)
     * @param velocityVector {Vector}
     */
    constructor({mass, velocityVector}) {
        this.mass = mass;
        this.velocityVector = velocityVector;
    }

    /**
     * @return {Number}
     */
    getMass() {
        return this.mass;
    }

    /**
     * @return {Vector}
     */
    getVelocity() {
        return this.velocityVector;
    }

    /**
     * @param velocityVector
     */
    setVelocity(velocityVector) {
        this.velocityVector = velocityVector;
    }

}

export default PhysicsData;