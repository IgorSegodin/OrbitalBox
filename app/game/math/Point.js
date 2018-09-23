class Point {

    constructor({x, y}) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    toString() {
        return `P[${this.x}, ${this.y}]`;
    }
}

export default Point;