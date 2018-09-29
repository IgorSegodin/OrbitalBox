import {meterToPixel} from 'util/FabricUtil';
import Point from 'game/math/Point';
import ObjectData from 'game/data/ObjectData';
import Camera from 'game/world/Camera';
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
     * @param camera {Camera}
     */
    transform({objectData, world, camera}) {
        let fabricObject = objectData.getProperties()._fabricObject_;
        if (!fabricObject) {
            const transformer = this.transformerMap[objectData.getType()];
            fabricObject = transformer.transform({objectData});
            objectData.getProperties()._fabricObject_ = fabricObject;
        }

        const objPos = objectData.getPosition();
        const cameraPos = camera.getPosition();

        const screenCenterX = camera.getWidth() / 2;
        const screenCenterY = camera.getHeight() / 2;

        const relativeX = meterToPixel(objPos.getX() - cameraPos.getX()) - fabricObject.getWidth() / 2;
        const relativeY = meterToPixel(objPos.getY() - cameraPos.getY()) - fabricObject.getHeight() / 2;

        fabricObject.set({
            scaleX: camera.getZoom(),
            scaleY: camera.getZoom(),
            left: screenCenterX + relativeX * camera.getZoom(),
            top: -screenCenterY + camera.getHeight() - relativeY * camera.getZoom()
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