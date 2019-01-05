import {fabric} from 'fabric';

import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import {meterToPixel, convertAngle} from "util/FabricUtil";

/**
 * @param objectData {ObjectData}
 */
function transformInternal({objectData}) {
    const props = objectData.getProperties();

    const width = meterToPixel(props.width);
    const height = meterToPixel(props.height);

    function getPoints(zoom) {
        if (zoom * width < 6) {
            zoom = 6 / width;
        }

        const h2 = height / 2;
        const h4 = height / 4;
        const w2 = width / 2;

        return [
            {x: -w2, y: -h2},
            {x: -w2, y: h4},
            {x: 0, y: h2},
            {x: w2, y: h4},
            {x: w2, y: -h2},
        ].map((p)=> {return {x: p.x * zoom, y: p.y * zoom * -1}}); // -1 because fabric has swapped Y axis, negative is above zero
    }

    const polygon = new fabric.Polygon(getPoints(1), {
        angle: convertAngle(props.rotationAngle || 0),

        fill: 'red',

        originX: 'center',
        originY: 'center',
    });

    polygon.updateProps = function({objectData, fabricObject, zoom}) {
        fabricObject.set({
            angle: convertAngle(objectData.getProperties().rotationAngle || 0),
            points: getPoints(zoom)
        });
    };

    return polygon;
}

function promise() {
    return new Promise(function (resolve, reject) {
        resolve({

            /**
             * @param objectData {ObjectData}
             */
            transform: function ({objectData}) {
                return transformInternal({
                    objectData
                });
            },

            type: objectTypes.SHIP
        });
    });
}

export default {
    promise
}