import Game from 'game/Game';
import 'style.css';

/**
 * @param id {String}
 * @param onChange {function}
 */
function initRangeInput({id, onChange}) {
    const inputEl = document.getElementById(id);
    const inputLabelEl = document.getElementById(`${id}Label`);

    inputLabelEl.innerText = onChange(inputEl.value) || inputEl.value;

    inputEl.oninput = function () {
        inputLabelEl.innerText = onChange(inputEl.value) || inputEl.value;
    };

    return {};
}


document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById('canvas');

    const game = new Game({canvasEl});

    initRangeInput({
        id: 'timeMultiplier',
        onChange: (val) => {
            game.setTimeMultiplier(val);
        }
    });

    initRangeInput({
        id: 'zoom',
        onChange: (val) => {
            val = val / 100;
            game.setZoom(val);
            return val;
        }
    });

    game.init();
});
