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
        return <div className={`field char_field widget-text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname}`}>
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
        return <div className={`field char_field widget-admin_auto_height_text_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname}`}>
            <div className="field-content">
                <div className="input">
                    <textarea style={{overflow: 'hidden', wordWrap: 'break-word', resize: 'horizontal', height: '93px'}} data-autosize-on="true" cols="40" id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} rows="1" defaultValue={this.props.value} onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>;
    }

    componentDidMount() {
        autosize($(`#${this.props.path}`));
    }
}

export class RichTextBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-rich_text_area fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname}`}>
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

export class ImageChooserBlock extends FieldBlock {
    render() {
        return <div className={`field model_choice_field widget-admin_image_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname}`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className="chooser image-chooser">
                        <div className="chosen">
                            <div className="preview-image">
                                <img alt="Wagtail collects insects by Margrit" className="show-transparency" src="/media/images/wagtail_collects_insects_by_Maggi_94.max-165x165.jpg" height="102" width="165" />
                            </div>
                            <ul className="actions">
                                <li>
                                    <button type="button" className="action-choose button-small button-secondary">Choose another image</button>
                                </li>
                                <li><a href={`/admin/images/${this.props.value}/`} className="edit-link button button-small button-secondary" target="_blank">Edit this image</a> </li>
                            </ul>
                        </div>
                        <div className="unchosen">
                            <button type="button" className="action-choose button-small button-secondary">Choose an image</button>
                        </div>
                    </div>
                    <input id={this.props.path} name={this.props.path} placeholder={this.props.schema.label} value={this.props.value} type="hidden" onChange={e => this.setValue(e.target.value)} />
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        createImageChooser(this.props.path);
    }
}
