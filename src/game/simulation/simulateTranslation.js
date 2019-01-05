import Timer from 'game/world/Timer';

/**
 * @param objects {Array<Object>}
 * @param timer {Timer}
 */
function simulateTranslation(objects, timer) {

    const now = timer.getTime();

    for (let obj of objects) {
        let translations = obj.get("translations");
        if (!translations || translations.length === 0) {
            continue;
        }

        let finishedTranslationData = [];

        for (let idx = 0; idx < translations.length; idx++) {
            const translationData = translations[idx];

            if (!translationData._simulation) {
                translationData._simulation = {
                    startTime: now,
                    finishTime: now + translationData.duration
                };
            }

            const timePassed = now - translationData._simulation.startTime;

            const linearProgress = timePassed / translationData.duration;

            translationData.updateValue({timePassed, linearProgress, translationData, targetObject: obj});

            if (now >= translationData._simulation.finishTime) {
                if (translationData.infinite) {
                    throw new Error('Infinite animation is not implemented yet');
                } else {
                    finishedTranslationData.push(translationData);
                }
            }
        }

        const nextList = [];

        for (let translationData of finishedTranslationData) {
            const idx = translations.indexOf(translationData);
            translations = translations.splice(idx + 1, 1);

            if (translationData.onFinish) {
                translationData.onFinish({translationData, targetObject: obj});
            }

            if (translationData.next) {
                nextList.push(translationData.next);
            }
        }

        obj.set({
            translations: translations.concat(nextList)
        });
    }

}

export default simulateTranslation;