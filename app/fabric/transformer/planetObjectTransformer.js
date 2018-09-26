import {fabric} from 'fabric';

import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import {promiseRawImage, meterToPixel} from 'util/FabricUtil';

import EarthImage from 'game/resources/images/planets/04earth.png';
import MoonImage from 'game/resources/images/planets/05moon.png';

function promiseImages() {
    return Promise.all([
        promiseRawImage(EarthImage),
        promiseRawImage(MoonImage),
    ]).then(function (images) {
        return {
            [EarthImage]: images[0],
            [MoonImage]: images[1],
        };
    })
}

/**
 * @param objectData {ObjectData}
 * @param images {Object} map with images
 */
function transformInternal({objectData, images}) {
    const props = objectData.getProperties();

    const img = images[props.image];

    const object = new fabric.Image(img);
    object.set({
        width: meterToPixel(props.radius) * 2,
        height: meterToPixel(props.radius) * 2,

        selectable: false,
        hasControls: false,
        hasBorders: false
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