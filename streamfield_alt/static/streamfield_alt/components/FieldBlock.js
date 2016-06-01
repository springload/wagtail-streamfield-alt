import * as React from 'react';

export default class FieldBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    setValue(value) {
        this.setState({
            value: value,
        })
    }
}
