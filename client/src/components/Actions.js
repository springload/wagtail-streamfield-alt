import React from 'react';

export default class Actions extends React.Component {
    render() {
        return <ul className="actions">
            <li>
                <button type="button" className="button action-choose button-small button-secondary">Choose another {this.props.type}</button>
            </li>
            <li>
                <a href={`/admin/${this.props.type}s/${this.props.value}/${this.props.type!=='image' ? 'edit' : ''}`} className="button edit-link button-small button-secondary" target="_blank">Edit this {this.props.type}</a>
            </li>
        </ul>
    }
}
