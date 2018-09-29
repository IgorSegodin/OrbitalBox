import {fabric} from 'fabric';

import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import NeptuneImage from 'game/resources/images/planets/010neptune.png';
import EarthImage from 'game/resources/images/planets/04earth.png';
import MoonImage from 'game/resources/images/planets/05moon.png';
import {propertyTranslation} from 'game/translation/TranslationFactory';
import {meterToPixel, promiseRawImage} from 'util/FabricUtil';

function promiseImages() {
    return Promise.all([
        promiseRawImage(EarthImage),
        promiseRawImage(MoonImage),
        promiseRawImage(NeptuneImage),
    ]).then(function (images) {
        return {
            [EarthImage]: images[0],
            [MoonImage]: images[1],
            [NeptuneImage]: images[2],
        };
    })
}

function createLoopRotation() {
    return Object.assign(
        propertyTranslation({
            property: 'angle',
            duration: 100000,
            finalValue: 360
        }),
        {
            onFinish: function ({translationData, targetObject}) {
                targetObject.set({
                    angle: 0
                });
                translationData.next = createLoopRotation();
            }
        }
    );
}

/**
 * @param objectData {ObjectData}
 * @param images {Object} map with images
 */
function transformInternal({objectData, images}) {
    const props = objectData.getProperties();

    const radiusInPixel = Math.max(meterToPixel(props.radius), 2); // min radius is 2 pixels

    const img = images[props.image];

    const object = new fabric.Image(img);
    object.set({
        width: radiusInPixel * 2,
        height: radiusInPixel * 2,

        originX: 'center',
        originY: 'center',

        selectable: false,
        hasControls: false,
        hasBorders: false,

        translations: [
            createLoopRotation()
        ]
    });

    return object;
}

function promise() {
    return promiseImages().then(function (images) {
        return {

            /**
             * @param objectData {ObjectData}
             */
            transform: function ({objectData}) {
                return transformInternal({
                    objectData,
                    images
                });
            },

            type: objectTypes.PLANET
        };
    });
}

export default {
    promise
}