import FieldBlock from './FieldBlock'

export class RawHTMLBlock extends FieldBlock {
    render() {
        return <div className={`field char_field widget-textarea fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <textarea cols="40" id={`${this.props.path}-value-html`} name={`${this.props.path}-value-html`} placeholder={this.props.schema.label} rows="10" defaultValue={this.props.value} onChange={e => this.setValue(e.target.value)}></textarea>
                    <span></span>
                </div>
            </div>
        </div>;
    }
}
