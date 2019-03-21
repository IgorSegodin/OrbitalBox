import {fabric} from 'fabric';

import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import {propertyTranslation} from 'game/translation/TranslationFactory';
import {meterToPixel} from 'util/FabricUtil';

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
 */
function transformInternal({objectData}) {
    const props = objectData.getProperties();

    const radiusInPixel = meterToPixel(props.radius);

    const object = new fabric.Circle();
    object.set({
        radius: radiusInPixel,
        fill: props.color,

        originX: 'center',
        originY: 'center',
    });

    object.updateProps = function ({objectData, fabricObject, zoom}) {
        const radius = Math.max(radiusInPixel * zoom, 3);
        fabricObject.set({
            radius: Math.max(radius, 3),
        });
    };

    return object;
}

function promise() {
    return new Promise((resolve, reject) => {
        resolve(
            {
                /**
                 * @param objectData {ObjectData}
                 */
                transform: function ({objectData}) {
                    return transformInternal({
                        objectData
                    });
                },

                type: objectTypes.PLANET
            }
        )
    });
}

export default {
    promise
}