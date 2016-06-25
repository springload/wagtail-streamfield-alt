import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';

export default class RawHTMLBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-textarea fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <textarea 
                    cols="40" 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    rows="10" 
                    defaultValue={this.props.value}
                    onChange={e => this.setValue(e.target.value)}
                    >
                    </textarea>
                    <span></span>
                </div>
                <ErrorMessage errors={this.props.errors} />
            </div>
        </div>;
    }
}
