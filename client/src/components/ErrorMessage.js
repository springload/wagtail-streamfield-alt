import React from 'react';

export default class ErrorMessage extends React.Component {
    render() {
        return <p className="error-message">
            { this.props.errors ? this.props.errors.map((error) => (
                <span key={`${this.props.path}-error`}>{error}</span>
                ))
             : null}
        </p>
    }
}
