import React from 'react';
import FieldBlock from './FieldBlock'
import ErrorMessage from './ErrorMessage';
import Actions from './Actions'

export default class PageChooserBlock extends FieldBlock {
    componentDidMount() {
        createPageChooser(`${this.props.path}`, [], this.props.can_choose_root);
    }

    render() {
        const page = this.props.preview ? this.props.preview : '';
        return <div className={`field model_choice_field widget-admin_page_chooser fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <div id={`${this.props.path}-chooser`} className={`chooser page-chooser ${this.props.value === null ? 'blank' : ''}`}>
                        <div className="chosen">
                            <span className="title">{page}</span>
                            <Actions type="page" value={this.props.value} />
                        </div>
                        <div className="unchosen">
                            <button type="button" className="button action-choose button-small button-secondary">Choose a page</button>
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
