import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';

export default class DateTimeBlock extends FieldBlock {
    componentDidMount() {
        initDateTimeChooser(`${this.props.path}`, {"dayOfWeekStart": 1});
    }

    render() {
        return 
            <div className={`field date_time_field widget-admin_date_time_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    onChange={e => this.setValue(e.target.value)} 
                    defaultValue={this.props.preview} 
                    type="text" 
                    />
                    <span></span>
                </div>
                <ErrorMessage errors={this.props.errors} />
            </div>
        </div>;
    }
}
