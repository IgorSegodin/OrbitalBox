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

    isShipAccelerate() {
        return this.inputState.isButtonPressed("87"); // W
    }

    isShipDecelerate() {
        return this.inputState.isButtonPressed("83"); // S
    }

    isShipRotateLeft() {
        return this.inputState.isButtonPressed("65"); // A
    }

    isShipRotateRight() {
        return this.inputState.isButtonPressed("68"); // D
    }

    // 16 = LSHIFT
    // 32 = space

}

export default InputActionMap;