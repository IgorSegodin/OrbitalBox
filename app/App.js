import 'style.css';
import Game from 'game/Game';

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById('canvas');

    const game = new Game({canvasEl});

    const timeMultiplierEl = document.getElementById('timeMultiplier');
    const timeMultiplierLabelEl = document.getElementById('timeMultiplierLabel');

    timeMultiplierLabelEl.innerText = timeMultiplierEl.value;
    game.setTimeMultiplier(timeMultiplierEl.value);

    timeMultiplierEl.oninput = function() {
        timeMultiplierLabelEl.innerText = timeMultiplierEl.value;
        game.setTimeMultiplier(timeMultiplierEl.value);
    };

    game.init();
});
