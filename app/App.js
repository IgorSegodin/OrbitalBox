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

function createSelect({containerId, options, onChange}) {
    const selectEl = document.createElement("select");
    selectEl.setAttribute("data-select-input", "");

    options.sort(function(a, b) {
        return a.getName().localeCompare(b.getName());
    }).forEach((o) => {
        const optionEl = document.createElement("option");
        optionEl.setAttribute("value", o.getId());
        optionEl.innerText = o.getName();

        selectEl.appendChild(optionEl);
    });
    const emptyOptionEl = document.createElement("option");
    emptyOptionEl.setAttribute("value", '0');
    emptyOptionEl.innerText = 'No target';
    selectEl.prepend(emptyOptionEl);

    if (options.length > 0) {
        selectEl.value = options[0].getId();
        onChange(selectEl.value);
    }

    selectEl.onchange = function () {
        onChange(selectEl.value || null);
    };

    const containerEl = document.getElementById(containerId);

    while (containerEl.firstChild) {
        containerEl.removeChild(containerEl.firstChild);
    }

    containerEl.appendChild(selectEl);

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
            val = val / 10000;
            game.setZoom(val);
            return val;
        }
    });

    game.init({
        updateTargetObjectOptions: function(options) {
            createSelect({
                containerId: 'targetSelect',
                options: options,
                onChange: (val) => {
                    game.setTargetObject(+val);
                }
            });
        }
    });
});
