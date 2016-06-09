import React from 'react';
import FieldBlock from './FieldBlock'

export default class TextBlock extends FieldBlock {
    componentDidMount() {
        autosize($(`#${this.props.path}`));
    }

    render() {
        return <div className={`field char_field widget-admin_auto_height_text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <textarea 
                    style={{overflow: 'hidden', wordWrap: 'break-word', resize: 'horizontal', height: '50px'}} 
                    data-autosize-on="true" 
                    cols="40" 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    rows="1" 
                    defaultValue={this.props.value} 
                    value={this.state.value} 
                    onChange={e => this.setValue(e.target.value)} 
                    />
                </div>
                <p className="error-message">
                    { this.props.errors ? this.props.errors.map((error) => (
                        <span key={`${this.props.path}-error`}>{error}</span>
                        ))
                     : null}
                </p>
            </div>
        </div>;
    }
}
