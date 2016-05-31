import * as React from 'react';
import FieldBlock from './FieldBlock'

export default class TimeBlock extends FieldBlock {
    componentDidMount() {
        initTimeChooser(`${this.props.path}-value`);
    }

    render() {
        return (
            <div className={`field time_field widget-admin_time_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder={this.props.schema.label} onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} type="text" />
                    <span></span>
                </div>
            </div>
        </div>);
    }
}