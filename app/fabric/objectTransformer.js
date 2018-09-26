import {meterToPixel} from 'util/FabricUtil';
import Point from 'game/math/Point';
import ObjectData from 'game/data/ObjectData';
import planetObjectTransformer from 'fabric/transformer/planetObjectTransformer';

const transformerLoaders = [
    planetObjectTransformer
];

class ObjectTransformer {

    /**
     * @param transformers {Array}
     */
    constructor({transformers}) {
        this.transformerMap = {};
        const thisClass = this;

        transformers.forEach((t) => {
            thisClass.transformerMap[t.type] = t;
        });
    }

    /**
     * @param objectData {ObjectData}
     * @param world {Object}
     */
    transform({objectData, world}) {
        let fabricObject = objectData.getProperties()._fabricObject_;
        if (!fabricObject) {
            const transformer = this.transformerMap[objectData.getType()];
            fabricObject = transformer.transform({objectData});
            objectData.getProperties()._fabricObject_ = fabricObject;
        }

        // TODO add camera projection calculation

        // center of canvas == world [0,0] point

        const xCenter = world.width / 2;
        const yCenter = world.height / 2;

        fabricObject.set({
            left: xCenter + meterToPixel(objectData.getPosition().getX()) - fabricObject.getWidth() / 2,
            top: -yCenter + world.height - meterToPixel(objectData.getPosition().getY()) - fabricObject.getHeight() / 2
        });

        return fabricObject;
    }
}

function promise() {
    return Promise.all(transformerLoaders.map((l) => l.promise()))
        .then(function(transformers) {
            return new ObjectTransformer({transformers});
        });
}

export default {
    promise
};