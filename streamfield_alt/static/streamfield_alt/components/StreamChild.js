import * as React from 'react';
import StreamMenu from './StreamMenu';
import { BLOCK_TYPES_REGISTRY } from '../config';

export default class StreamChild extends React.Component {
    constructor(props) {
        super(props);
    }

    renderBlock(value, schema, path) {
        const Component = BLOCK_TYPES_REGISTRY[schema.type];
        return <Component value={value} schema={schema} path={path} />;
    }

    render() {
        const isDeleted = this.props.isDeleted ? this.props.isDeleted : '';
        const actionButtons = [];

        if (!this.props.isFirst) {
            actionButtons.push(<button key="moveup" type="button" id={`${this.props.path}-moveup`} title="Move up" className="button icon text-replace icon-order-up" onClick={this.props.onMoveUpItem}>Move up</button>);
        }

        if (!this.props.isLast) {
            actionButtons.push(<button key="movedown" type="button" id={`${this.props.path}-movedown`} title="Move down" className="button icon text-replace icon-order-down" onClick={this.props.onMoveDownItem}>Move down</button>);
        }

        actionButtons.push(<button key="delete" type="button" id={`${this.props.path}-delete`} title="Delete" className="button icon text-replace hover-no icon-bin" onClick={this.props.onDeleteItem}>Delete</button>);

        return <li id={`${this.props.path}-container`} className={`sequence-member blockname-${this.props.type} ${isDeleted === true ? '-hide' : ''}`}>
            <input type="hidden" id={`${this.props.path}-deleted`} name={`${this.props.path}-deleted`} value={isDeleted} />
            <input type="hidden" id={`${this.props.path}-order`} name={`${this.props.path}-order`} value={`${this.props.index}`} />
            <input type="hidden" id={`${this.props.path}-type`} name={`${this.props.path}-type`} value={`${this.props.type}`} />
            <div className="sequence-controls">
                <h3><label for={`${this.props.path}-value`}>{this.props.schema.label}</label></h3>
                <div className="button-group button-group-square">
                    {actionButtons}
                </div>
            </div>
            <div className="sequence-member-inner ">
                {this.renderBlock(this.props.value, this.props.schema, this.props.path)}
            </div>
            { ((this.props.streamFieldValue.length - this.props.deletedItems) < this.props.maxNum) ? (
                <StreamMenu
                    id={`${this.props.path}-appendmenu`}
                    index={this.props.index}
                    schema={this.props.parentSchema}
                    onAddItem={this.props.onAddItem}
                />
            ) : null }
        </li>;
    }
}
