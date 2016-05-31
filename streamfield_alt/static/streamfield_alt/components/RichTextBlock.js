import * as React from 'react';
import FieldBlock from './FieldBlock'

export default class RichTextBlock extends FieldBlock {
    componentDidMount() {
        makeRichTextEditable(`${this.props.path}-value`);
    }

    render() {
        return <div className={`field char_field widget-rich_text_area fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <textarea cols="40" id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder="Paragraph" rows="10" defaultValue={this.props.value} onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>;
    }
}