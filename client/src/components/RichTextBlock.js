import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';

export default class RichTextBlock extends FieldBlock {
    componentDidMount() {
        makeHalloRichTextEditable(`${this.props.path}`);
    }

    render() {
        return <div className={`field char_field widget-hallo_rich_text_area fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <textarea 
                    cols="40" 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder="Paragraph" 
                    rows="10" 
                    defaultValue={this.props.preview ? this.props.preview : this.props.value} 
                    onChange={e => this.setValue(e.target.value)} 
                    />
                </div>
                <ErrorMessage errors={this.props.errors} />
            </div>
        </div>;
    }
}
