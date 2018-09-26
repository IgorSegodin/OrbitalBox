import Point from 'game/math/Point';
import PhysicsData from 'game/data/PhysicsData';

/**
 *  General world object data
 */
class ObjectData {

    /**
     * @param id {Number}
     * @param name {String}
     * @param position {Point}
     * @param physicsData {PhysicsData}
     * @param type {String}
     * @param properties {Object} type-specific object properties
     */
    constructor({id, name, position, physicsData, type, properties}) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.physicsData = physicsData;
        this.type = type;
        this.properties = properties;
    }

    /**
     * @return {Number}
     */
    getId() {
        return this.id;
    }

    /**
     * @return {String}
     */
    getName() {
        return this.name;
    }

    /**
     * @return {Point}
     */
    getPosition() {
        return this.position;
    }

    /**
     * @param position {Point}
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * @return {PhysicsData}
     */
    getPhysicsData() {
        return this.physicsData;
    }

    /**
     * @return {String}
     */
    getType() {
        return this.type;
    }

    /**
     * @return {Object}
     */
    getProperties() {
        return this.properties;
    }

}

export default ObjectData;