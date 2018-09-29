import Point from 'game/math/Point';

class Camera {

    /**
     * @param width {Number} available screen width (px)
     * @param height {Number} available screen height (px)
     * @param position {Point}
     * @param zoom {Number}
     */
    constructor({width, height, position, zoom = 1}) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.zoom = zoom;
    }

    /**
     * @return {Number}
     */
    getWidth() {
        return this.width;
    }

    /**
     * @return {Number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * @return {Point}
     */
    getPosition() {
        return this.position;
    }

    /**
     * @param point {Point}
     */
    setPosition(point) {
        this.position = point;
    }

    /**
     * @return {Number}
     */
    getZoom() {
        return this.zoom;
    }

    /**
     * @param zoom {Number}
     */
    setZoom(zoom) {
        this.zoom = zoom;
    }

}

export default Camera;