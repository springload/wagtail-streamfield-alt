import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';
import Actions from './Actions'

export default class ImageChooserBlock extends FieldBlock {
    componentDidMount() {
        createImageChooser(`${this.props.path}`);
    }

    render() {
        const image = this.props.preview ? this.props.preview : '';
        return <div className={`field model_choice_field widget-admin_image_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser image-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                            <div className="preview-image">
                                <img alt="Wagtail collects insects by Margrit" className="show-transparency" src={image} height="102" width="165" />
                            </div>
                            <Actions type="image" value={this.props.value} />
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
                <ErrorMessage errors={this.props.errors} />
            </div>
        </div>
    }
}
