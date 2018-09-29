import Point from 'game/math/Point';

/**
 * Current user input state
 */
class InputState {

    constructor() {
        this.buttonInput = {};
        this.cursorPoint = new Point({x: 0, y: 0});
    }

    /**
     * @param code {String}
     * @return {boolean}
     */
    isButtonPressed(code) {
        return this.buttonInput[code] === 1;
    }

    /**
     * @param code {String}
     * @param pressed {boolean}
     */
    setButtonState(code, pressed) {
        this.buttonInput[code] = pressed ? 1 : 0;
    }

    /**
     * @return {Point}
     */
    getCursorPoint() {
        return this.cursorPoint;
    }

    /**
     * @return {Point}
     */
    setCursorPoint(point) {
        this.cursorPoint = point;
    }

}

export default InputState;