import React from 'react';
import FieldBlock from './FieldBlock'

export default class ImageChooserBlock extends FieldBlock {
    componentDidMount() {
        createImageChooser(`${this.props.path}`);
    }

    render() {
        return <div className={`field model_choice_field widget-admin_image_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
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
                    <input 
                    id={`${this.props.path}`} 
                    name={`${this.props.path}`} 
                    placeholder={this.props.schema.label} 
                    defaultValue={this.props.value} 
                    type="hidden" 
                    onChange={e => this.setValue(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    }
}
