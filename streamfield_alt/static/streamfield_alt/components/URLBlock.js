import * as React from 'react';
import FieldBlock from './FieldBlock'

export default class URLBlock extends FieldBlock {
    render() {
        return <div className={`field url_field widget-url_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder={this.props.schema.label} type="url" onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} />
                    <span></span>
                </div>
            </div>
        </div>;
    }
}
