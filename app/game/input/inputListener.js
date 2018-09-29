import InputState from 'game/input/InputState';

// TODO return function to be able to clear listener
/**
 * @param inputState {InputState}
 * @return {Function}
 */
function inputListener(inputState) {
    document.addEventListener("keydown", function (e) {
        inputState.setButtonState(e.keyCode, true);
    });
    document.addEventListener("keyup", function (e) {
        inputState.setButtonState(e.keyCode, false);
    });

    return function () {
    };
}

export default inputListener