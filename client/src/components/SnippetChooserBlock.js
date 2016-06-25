import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';

export default class SnippetChooserBlock extends FieldBlock {
    componentDidMount() {
        createSnippetChooser(`${this.props.path}`, `${this.props.schema.app}/${this.props.schema.model}`);
    }

    render() {
        const snippet = this.props.preview ? this.props.preview : '';
        return <div className={`field model_choice_field widget-admin_snippet_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser snippet-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                            <span className="title">{snippet}</span>
                            <ul className="actions">
                                <li>
                                    <button type="button" className="button action-choose button-small button-secondary">Choose another snippet</button>
                                </li>
                                <li>
                                    <a href={`/admin/snippets/${this.props.value}/edit`} className="button edit-link button-small button-secondary" target="_blank">Edit this snippet</a>
                                </li>
                            </ul>
                        </div>
                        <div className="unchosen">
                            <button type="button" className="button action-choose button-small button-secondary">Choose {this.props.schema.model}</button>
                        </div>
                    </div>
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    defaultValue={this.props.value} 
                    type="hidden" 
                    onChange={e => this.setValue(e.target.value)} 
                    />
                </div>
                <ErrorMessage errors={this.props.errors} />
            </div>
        </div>
    }
}
