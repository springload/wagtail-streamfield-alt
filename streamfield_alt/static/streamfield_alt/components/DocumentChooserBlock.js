import React from 'react';
import FieldBlock from './FieldBlock'

export default class DocumentChooserBlock extends FieldBlock {
    componentDidMount() {
        createDocumentChooser(`${this.props.path}-value`);
    }

    render() {
        return <div className={`field model_choice_field widget-admin_document_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-value-chooser`} className={`chooser document-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                            <span className="title"></span>
                            <ul className="actions">
                                <li>
                                    <button type="button" className="button action-choose button-small button-secondary">Choose another document</button>
                                </li>
                                <li>
                                    <a href={`/admin/documents/${this.props.value}/edit`} className="button edit-link button-small button-secondary" target="_blank">Edit this document</a>
                                </li>
                            </ul>
                        </div>
                        <div className="unchosen">
                            <button type="button" className="button action-choose button-small button-secondary">Choose a document</button>
                        </div>
                    </div>
                    <input id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder={this.props.schema.label} value={this.props.value === null ? '' : this.props.value} type="hidden" onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>
    }
}
