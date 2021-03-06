import planetObjectTransformer from 'fabric/transformer/planetObjectTransformer';
import shipObjectTransformer from 'fabric/transformer/shipObjectTransformer';
import ObjectData from 'game/data/ObjectData';
import Camera from 'game/world/Camera';
import {meterToPixel} from 'util/FabricUtil';

const transformerLoaders = [
    planetObjectTransformer,
    shipObjectTransformer
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
     * @param camera {Camera}
     */
    transform({objectData, camera}) {
        let fabricObject = objectData.getProperties()._fabricObject_;
        if (!fabricObject) {
            const transformer = this.transformerMap[objectData.getType()];
            fabricObject = transformer.transform({objectData, fabricObject});
            objectData.getProperties()._fabricObject_ = fabricObject;
            fabricObject.set({_objectData_: objectData});
        }

        if (fabricObject.updateProps) {
            fabricObject.updateProps({objectData, fabricObject, zoom: camera.getZoom()});
        }

        const objPos = objectData.getPosition();
        const cameraPos = camera.getPosition();

        const screenCenterX = (camera.getWidth() / 2);
        const screenCenterY = (camera.getHeight() / 2);

        const relativeX = meterToPixel(objPos.getX() - cameraPos.getX()) * camera.getZoom();
        const relativeY = meterToPixel(objPos.getY() - cameraPos.getY()) * camera.getZoom();

        const left = screenCenterX + relativeX;
        const top = -screenCenterY + camera.getHeight() - relativeY;

        fabricObject.set({
            left: left,
            top: top
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