import FieldBlock from './FieldBlock'

export class ChoiceBlock extends FieldBlock {
    componentDidMount() {
        makeRichTextEditable(`${this.props.path}-value`);
    }

    render() {
        return <div className={`field choice_field widget-rich_text_area fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <select id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder={this.props.label}>
                        {this.props.schema.choices.map((item) => (
                            <option key={item[0]} value={item[0]}>{item[1]}</option>
                        ))}
                    </select>
                    <span></span>
                </div>
            </div>
        </div>;
    }
}
