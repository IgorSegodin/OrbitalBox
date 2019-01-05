import InputState from 'game/input/InputState';
import Point from "game/math/Point";

// TODO return function to be able to clear listener
/**
 * @param canvas
 * @param inputState {InputState}
 * @return {Function}
 */
function canvasListener({canvas, inputState}) {
    canvas.addEventListener('mousemove', function (e) {
        inputState.setCursorPoint(new Point({x: e.clientX, y: e.clientY}));
    });

    canvas.addEventListener('mousedown', function (e) {
        inputState.setCursorPoint(new Point({x: e.clientX, y: e.clientY}));
        inputState.setButtonState("mouse_" + e.which, true);
    });

    canvas.addEventListener('mouseup', function (e) {
        inputState.setCursorPoint(new Point({x: e.clientX, y: e.clientY}));
        inputState.setButtonState("mouse_" + e.which, false);
    });

    return function () {
    };
}

export default canvasListener