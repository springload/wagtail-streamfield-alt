import FieldBlock from './FieldBlock'

export class DateTimeBlock extends FieldBlock {
    componentDidMount() {
        initDateTimeChooser(`${this.props.path}-value`, {"dayOfWeekStart": 1});
    }

    render() {
        return (
            <div className={`field date_time_field widget-admin_date_time_input fieldname-${this.props.schema.label.toLowerCase()} ${this.props.schema.classname ? this.props.schema.classname : ''}`}>
            <div className="field-content">
                <div className="input">
                    <input id={`${this.props.path}-value`} name={`${this.props.path}-value`} placeholder={this.props.schema.label} onChange={e => this.setValue(e.target.value)} defaultValue={this.props.value} type="text" />
                    <span></span>
                </div>
            </div>
        </div>);
    }
}
