import React from 'react';
import FieldBlock from './FieldBlock'

export default class BooleanBlock extends FieldBlock {
    render() {
        return <div className={`field boolean_field widget-checkbox_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    type="checkbox" 
                    onChange={e => this.setValue(e.target.value)} 
                    defaultValue={this.props.value} 
                    />
                    <span></span>
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
