import React from 'react';
import IntelligentStreamMenu from '../containers/IntelligentStreamMenu';
// import { BLOCK_TYPES_REGISTRY } from '../config';

export default class StreamChild extends React.Component {
    constructor(props) {
        super(props);
        this.renderBlock = this.renderBlock.bind(this);
    }

    renderBlock(value, schema, path, errors, preview) {
        const Component = this.props.types[schema.type];
        console.log('StreamChild', schema, Component);
        return <Component
            value={value}
            schema={schema}
            path={`${path}-value`}
            errors={errors}
            preview={preview}
            types={this.props.types}
        />;
    }

    render() {
        const { index } = this.props;
        const intIndex = parseInt(index);
        const isDeleted = this.props.isDeleted ? this.props.isDeleted : '';
        const actionButtons = [];

        console.log(this.props);

        if (!this.props.isFirst) {
            actionButtons.push(
                <button
                key="moveup"
                type="button"
                id={`${this.props.path}-moveup`}
                title="Move up"
                className="button icon text-replace icon-order-up"
                onClick={(evt) => this.props.moveChildBlock(intIndex, intIndex-1)}
                >
                    Move up
                </button>
            );
        }

        if (!this.props.isLast) {
            actionButtons.push(
                <button
                key="movedown"
                type="button"
                id={`${this.props.path}-movedown`}
                title="Move down"
                className="button icon text-replace icon-order-down"
                onClick={(evt) => this.props.moveChildBlock(intIndex, intIndex+1)}
                >
                    Move down
                </button>
            );
        }

        actionButtons.push(
            <button
            key="delete"
            type="button"
            id={`${this.props.path}-delete`}
            title="Delete"
            className="button icon text-replace hover-no icon-bin"
            onClick={(evt) => this.props.deleteChildBlock(intIndex, this.props.deletedItems)}
            >
                Delete
            </button>
        );

        return <li id={`${this.props.path}-container`} className={`sequence-member blockname-${this.props.type} ${isDeleted === true ? '-hide' : ''}`}>
            <input type="hidden" id={`${this.props.path}-deleted`} name={`${this.props.path}-deleted`} value={isDeleted} />
            <input type="hidden" id={`${this.props.path}-order`} name={`${this.props.path}-order`} value={`${index}`} />
            <input type="hidden" id={`${this.props.path}-type`} name={`${this.props.path}-type`} value={`${this.props.type}`} />
            <div className="sequence-controls">
                <h3><label for={`${this.props.path}-value`}>{this.props.schema.label}</label></h3>
                <div className="button-group button-group-square">
                    {actionButtons}
                </div>
            </div>
            <div className="sequence-member-inner ">
                {this.renderBlock(
                    this.props.value,
                    this.props.schema,
                    this.props.path,
                    this.props.errors,
                    this.props.preview,
                    this.props.types
                )}
            </div>
            { ((this.props.streamFieldValue.length - this.props.deletedItems) < this.props.maxNum) ? (
                <IntelligentStreamMenu
                    id={`${this.props.path}-appendmenu`}
                    index={intIndex + 1}
                    schema={this.props.parentSchema}
                />
            ) : null }
        </li>;
    }
}
