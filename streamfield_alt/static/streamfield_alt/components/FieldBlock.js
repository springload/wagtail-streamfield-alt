import React from 'react';

export default class FieldBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
        }
    }

    setValue(value) {
        this.setState({
            value: value,
        })
    }
}
