import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';

export default class ListBlock extends FieldBlock {
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
               <ErrorMessage errors={this.props.errors} />
            </div>
        </div>;
    }
}
