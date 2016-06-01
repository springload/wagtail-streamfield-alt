import React from 'react';
import FieldBlock from './FieldBlock'

export default class DateBlock extends FieldBlock {
    componentDidMount() {
        initDateChooser(`${this.props.path}`, {"dayOfWeekStart": 1});
    }

    render() {
        return (
            <div className={`field date_field widget-admin_date_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    onChange={e => this.setValue(e.target.value)} 
                    defaultValue={this.props.value} 
                    type="text" 
                    />
                    <span></span>
                </div>
            </div>
        </div>);
    }
}
