import ObjectData from 'game/data/ObjectData';
import PropTypes from 'prop-types';
import React from "react";

import ObjectDataView from 'ui/ObjectDataView';

class ControlPanel extends React.Component {

    static propTypes = {
        objectData: PropTypes.instanceOf(ObjectData).isRequired,
    };

    render() {
        return (
            <div>
                <ObjectDataView objectData={this.props.objectData}/>
            </div>
        );
    }

}

export default ControlPanel;