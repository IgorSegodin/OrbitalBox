import ObjectData from 'game/data/ObjectData';
import objectTypes from 'game/data/objectTypes';
import PropTypes from 'prop-types';
import React from "react";

class ObjectDataView extends React.Component {

    static propTypes = {
        objectData: PropTypes.instanceOf(ObjectData).isRequired,
    };

    render() {
        const {id, name, position, physicsData, type, properties} = this.props.objectData;

        return (
            <div>
                <div>Id: {id}</div>
                <div>Name: {name}</div>
                <div>X= {position.getX().toFixed(2)}</div>
                <div>Y= {position.getY().toFixed(2)}</div>
                <div>Mass: {(physicsData.getMass() * Math.pow(10, -20)).toFixed(0)} x 10^20 kg</div>

                {
                    physicsData.getVelocity() &&
                    <div>
                        <div>Velocity: {physicsData.getVelocity().getValue().toFixed(2)}</div>
                        <div>Angle: {physicsData.getVelocity().getAngle().toFixed(2)}</div>
                    </div>
                }

                {
                    properties && properties.static && <div>Static</div>
                }

                {
                    objectTypes.PLANET === type &&
                    <div>Color: {properties.color}
                    &nbsp;
                        <div style={{
                            backgroundColor: properties.color,
                            display: "inline-block",
                            width: "15px",
                            height: "15px"
                        }}></div>
                    </div>
                }

            </div>
        );
    }

}

export default ObjectDataView;