class Vector {

    /**
     * @param value {Number} velocity, m/s
     * @param angle {Number} counter clockwise from positive X axis, degrees
     */
    constructor({value, angle}) {
        this.value = value;
        this.angle = angle;
    }

    getValue() {
        return this.value;
    }

    getAngle() {
        return this.angle;
    }

    toString() {
        return `V[${this.value}, ${this.angle}°]`;
    }
}

export default Vector;