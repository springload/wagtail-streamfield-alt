import * as React from 'react';
import FieldBlock from './FieldBlock'

export default class TextBlock extends FieldBlock {
    componentDidMount() {
        autosize($(`#${this.props.path}-value`));
    }

    render() {
        return <div className={`field char_field widget-admin_auto_height_text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <textarea 
                    style={{overflow: 'hidden', wordWrap: 'break-word', resize: 'horizontal', height: '50px'}} 
                    data-autosize-on="true" 
                    cols="40" 
                    id={`${this.props.path}-value`} 
                    name={`${this.props.path}-value`} 
                    placeholder={this.props.schema.label} 
                    rows="1" 
                    defaultValue={this.props.value} 
                    value={this.state.value} 
                    onChange={e => this.setValue(e.target.value)} 
                    />
                </div>
            </div>
        </div>;
    }
}
