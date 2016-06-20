import React from 'react';
import FieldBlock from './FieldBlock'

export default class CharBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    defaultValue={this.props.value} 
                    type="text" 
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
