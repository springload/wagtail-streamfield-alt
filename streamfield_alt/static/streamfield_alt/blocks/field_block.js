import * as React from 'react';


export function fieldBlockReducerBuilder(schema) {
    return (state=[], action) => {
        switch (action.type) {
            case 'SET_VALUE':
                return action.value;
        }

        return state;
    }
}


export class FieldBlock extends React.Component {
    setValue(value) {
        this.props.store.dispatch({
            type: 'SET_VALUE',
            path: this.props.path,
            value: value,
        })
    }
}

export class CharBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} defaultValue={this.props.value} type="text" onChange={e => this.setValue(e.target.value)} />
               </div>
            </div>
        </div>;
    }
}

export class TextBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-admin_auto_height_text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <textarea style={{overflow: 'hidden', wordWrap: 'break-word', resize: 'horizontal', height: '50px'}} data-autosize-on="true" cols="40" id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} rows="1" defaultValue={this.props.value} onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>;
    }

    componentDidMount() {
        autosize($(`#${this.props.path}`));
    }
}

export class URLBlock extends FieldBlock {
    render() {
        return <div className={`field url_field widget-url_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} type="url" onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} />
                    <span></span>
                </div>
            </div>
        </div>;
    }
}

export class BooleanBlock extends FieldBlock {
    render() {
        return <div className={`field boolean_field widget-checkbox_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} type="checkbox" onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} />
                    <span></span>
                </div>
            </div>
        </div>;
    }
}

export class RichTextBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-rich_text_area fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <textarea cols="40" id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder="Paragraph" rows="10" defaultValue={this.props.value} onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>;
    }

    componentDidMount() {
        makeRichTextEditable(`${this.props.path}-value`);
    }
}

export class RawHTMLBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-textarea fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <textarea cols="40" id={`${this.props.path}-value-html`} name={`${this.props.path}-value-html`} placeholder={this.props.schema.label} rows="10" defaultValue={this.props.value} onChange={e => this.setValue(e.target.value)}></textarea>
                    <span></span>
                </div>
            </div>
        </div>;
    }
}

export class DateBlock extends FieldBlock {
    componentDidMount() {
        initDateChooser(this.props.path, {"dayOfWeekStart": 1});
    }

    render() {
        return (
            <div className={`field date_field widget-admin_date_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} type="text" />
                    <span></span>
                </div>
            </div>
        </div>);
    }
}

export class TimeBlock extends FieldBlock {
    componentDidMount() {
        initTimeChooser(this.props.path);
    }

    render() {
        return (
            <div className={`field time_field widget-admin_time_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} type="text" />
                    <span></span>
                </div>
            </div>
        </div>);
    }
}

export class DateTimeBlock extends FieldBlock {
    componentDidMount() {
        initDateTimeChooser(this.props.path, {"dayOfWeekStart": 1});
    }

    render() {
        return (
            <div className={`field date_time_field widget-admin_date_time_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} type="text" />
                    <span></span>
                </div>
            </div>
        </div>);
    }
}

export class ChoiceBlock extends FieldBlock {
    render() {
        return <div className={`field choice_field widget-rich_text_area fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <select id={this.props.path} name={this.props.path} placeholder={this.props.label}>
                        {this.props.schema.choices.map((item) => (
                            <option key={item[0]} value={item[0]}>{item[1]}</option>
                        ))}
                    </select>
                    <span></span>
                </div>
            </div>
        </div>;
    }

    componentDidMount() {
        makeRichTextEditable(`${this.props.path}-value`);
    }
}

export class ImageChooserBlock extends FieldBlock {
    render() {
        return <div className={`field model_choice_field widget-admin_image_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser image-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                                <div className="preview-image">
                                    <img alt="Wagtail collects insects by Margrit" className="show-transparency" src="" height="102" width="165" />
                                </div>
                            <ul className="actions">
                                <li>
                                    <button type="button" className="button action-choose button-small button-secondary">Choose another image</button>
                                </li>
                                <li>
                                    <a href={`/admin/images/${this.props.value}/`} className="button edit-link button-small button-secondary" target="_blank">Edit this image</a>
                                </li>
                            </ul>
                        </div>
                        <div className="unchosen">
                            <button type="button" className="button action-choose button-small button-secondary">Choose an image</button>
                        </div>
                    </div>
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} value={this.props.value === null ? '' : this.props.value} type="hidden" onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        createImageChooser(this.props.path);
    }
}

export class PageChooserBlock extends FieldBlock {
    render() {
        return <div className={`field model_choice_field widget-admin_page_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser page-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                            <span className="title"></span>
                            <ul className="actions">
                                <li>
                                    <button type="button" className="button action-choose button-small button-secondary">Choose another page</button>
                                </li>
                                <li>
                                    <a href={`/admin/pages/${this.props.value}/edit`} className="button edit-link button-small button-secondary" target="_blank">Edit this page</a>
                                </li>
                            </ul>
                        </div>
                        <div className="unchosen">
                            <button type="button" className="button action-choose button-small button-secondary">Choose a page</button>
                        </div>
                    </div>
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} value={this.props.value === null ? '' : this.props.value} type="hidden" onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        createPageChooser(this.props.path, [], this.props.can_choose_root);
    }
}

export class DocumentChooserBlock extends FieldBlock {
    render() {
        return <div className={`field model_choice_field widget-admin_document_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}
`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser document-chooser ${this.props.value === null ? 'blank' : ''}`}>
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
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} value={this.props.value === null ? '' : this.props.value} type="hidden" onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        createDocumentChooser(this.props.path);
    }
}
