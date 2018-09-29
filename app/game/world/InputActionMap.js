import InputState from 'game/input/InputState';

/**
 * Holds all available game control actions.
 */
class InputActionMap {

    /**
     * @param inputState {InputState}
     */
    constructor({inputState}) {
        this.inputState = inputState;
    }

    isCameraMoveLeft() {
        return this.inputState.isButtonPressed("37"); // Arrow left
    }

    isCameraMoveUp() {
        return this.inputState.isButtonPressed("38"); // Arrow up
    }

    isCameraMoveRight() {
        return this.inputState.isButtonPressed("39"); // Arrow right
    }

    isCameraMoveDown() {
        return this.inputState.isButtonPressed("40"); // Arrow down
    }

    isMouseLeftBtn() {
        return this.inputState.isButtonPressed("mouse_1"); // left mouse button
    }

}

export default InputActionMap;