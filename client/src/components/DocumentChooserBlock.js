import React from 'react';
import FieldBlock from './FieldBlock'

export default class DocumentChooserBlock extends FieldBlock {
    componentDidMount() {
        createDocumentChooser(`${this.props.path}`);
    }

    render() {
        const doc = this.props.preview ? this.props.preview : '';
        return <div className={`field model_choice_field widget-admin_document_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser document-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                            <span className="title">{doc}</span>
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
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    defaultValue={this.props.value} 
                    type="hidden" 
                    onChange={e => this.setValue(e.target.value)} />
                </div>
                <p className="error-message">
                    { this.props.errors ? this.props.errors.map((error) => (
                        <span key={`${this.props.path}-error`}>{error}</span>
                        ))
                     : null}
                </p>
            </div>
        </div>
    }
}
