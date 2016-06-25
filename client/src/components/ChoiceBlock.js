import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';

export default class ChoiceBlock extends FieldBlock {
    render() {
        return <div className={`field choice_field widget-select fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <select 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.label}
                    defaultValue={this.props.value}
                    >
                        {this.props.schema.choices.map((item) => (
                            <option key={item[0]} value={item[0]}>
                                {item[1]}
                            </option>
                        ))}
                    </select>
                    <span></span>
                </div>
                <ErrorMessage errors={this.props.errors} />
            </div>
        </div>;
    }
}
