const LEFT_MOUSE_BTN = "LEFT_MOUSE_BTN";
const RIGHT_MOUSE_BTN = "RIGHT_MOUSE_BTN";

function process(keyCode, world, isUp) {
    let btn;
    switch (keyCode) {
        case 1: {
            btn = LEFT_MOUSE_BTN;
            break;
        }
    }
    if (btn) {
        world.cursor.input[btn] = isUp ? 0 : 1;
    }
}

// TODO return function to be able to clear listener
function inputListener(canvas, world) {
    canvas.addEventListener('mousemove', function(e) {
        world.cursor.x = e.clientX;
        world.cursor.y = e.clientY;
    });

    canvas.addEventListener('mousedown', function(e) {
        world.cursor.x = e.clientX;
        world.cursor.y = e.clientY;
        process(e.which, world, false);
    });

    canvas.addEventListener('mouseup', function(e) {
        world.cursor.x = e.clientX;
        world.cursor.y = e.clientY;
        process(e.which, world, true);
    });

    return function () {
    };
}


export default inputListener

export {LEFT_MOUSE_BTN, RIGHT_MOUSE_BTN}