import {fabric} from 'fabric';

import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import SunImage from 'game/resources/images/planets/01sun.png';
import MercuryImage from 'game/resources/images/planets/02mercury.png';
import VenusImage from 'game/resources/images/planets/03venus.png';
import EarthImage from 'game/resources/images/planets/04earth.png';
import MoonImage from 'game/resources/images/planets/05moon.png';
import MarsImage from 'game/resources/images/planets/06mars.png';
import JupiterImage from 'game/resources/images/planets/07jupiter.png';
import SaturnImage from 'game/resources/images/planets/08saturn.png';
import UranusImage from 'game/resources/images/planets/09uranus.png';
import NeptuneImage from 'game/resources/images/planets/010neptune.png';
import PlutoImage from 'game/resources/images/planets/011pluto.png';
import {propertyTranslation} from 'game/translation/TranslationFactory';
import {meterToPixel, promiseRawImage} from 'util/FabricUtil';

function promiseImages() {
    return Promise.all([
        promiseRawImage(SunImage),
        promiseRawImage(MercuryImage),
        promiseRawImage(VenusImage),
        promiseRawImage(EarthImage),
        promiseRawImage(MoonImage),
        promiseRawImage(MarsImage),
        promiseRawImage(JupiterImage),
        promiseRawImage(SaturnImage),
        promiseRawImage(UranusImage),
        promiseRawImage(NeptuneImage),
        promiseRawImage(PlutoImage),
    ]).then(function (images) {
        return {
            [SunImage]: images[0],
            [MercuryImage]: images[1],
            [VenusImage]: images[2],
            [EarthImage]: images[3],
            [MoonImage]: images[4],
            [MarsImage]: images[5],
            [JupiterImage]: images[6],
            [SaturnImage]: images[7],
            [UranusImage]: images[8],
            [NeptuneImage]: images[9],
            [PlutoImage]: images[10],
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