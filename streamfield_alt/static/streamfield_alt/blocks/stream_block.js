import * as React from 'react';

import {renderBlock, getBlockReducer} from '.';


export function streamBlockReducerBuilder(schema) {

    return (state=[], action) => {
        if (!action.pathComponents.length) {
            // Action is for this block
            switch (action.type) {
                case 'NEW_CHILD_BLOCK':
                    let newBlock = {
                        type: action.blockType,
                        value: schema.child_blocks[action.blockType].default_value,
                    };

                    return [
                        ...state.slice(0, action.position),
                        newBlock,
                        ...state.slice(action.position),
                    ];
                    break;
                case 'DELETE_CHILD_BLOCK':
                    const oldArr = [...state];
                    const deletedChild = oldArr[action.position];
                    deletedChild['isDeleted'] = true;
                    const newArr = oldArr.filter((child, index) => index !== action.position);
                    newArr.push(deletedChild);
                    return newArr;
                    break;
                case 'MOVE_CHILD_BLOCK':
                    const arr = [...state];
                    arr.splice(action.to, 0, arr.splice(action.position, 1)[0]);
                    return arr;
                    break;
            }
        } else {
            // Action is for a child block
            let blockId = action.pathComponents[0];
            let newAction = Object.assign({}, action, {
                pathComponents: action.pathComponents.slice(1),
            });
            let blockType = state[blockId].type;
            let blockValue = state[blockId].value;

            let newState = state.slice();
            newState[blockId] = {
                type: blockType,
                value: getBlockReducer(schema.child_blocks[blockType])(blockValue, newAction)
            };

            return newState;
        }

        return state;
    }
}


class StreamMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    getClassNames() {
        let classNames = ['stream-menu'];

        if (!this.state.isOpen) {
            classNames.push('stream-menu-closed');
        }

        return classNames;
    }

    onToggle(e) {
        this.state.isOpen = !this.state.isOpen;
        this.setState(this.state);

        e.preventDefault();
        return false;
    }

    render() {
        let choices = [];

        for (let choice in this.props.schema.child_blocks) {
            let schema = this.props.schema.child_blocks[choice];

            let onClick = e => {
                this.props.onAddItem(choice);

                this.state.isOpen = false;
                this.setState(this.state);

                e.preventDefault();
                return false;
            }

            choices.push(
                <li key={choice}>
                    <button type="button" className={`action-add-block-h2 icon icon-${schema.icon ? schema.icon : 'placeholder'}`} onClick={onClick}><span>{schema.label}</span> </button>
                </li>
            );
        }

        let menu = [];
        if (this.state.isOpen) {
            menu = <div key="menu" className="stream-menu-inner">
                <ul>
                    {choices}
                </ul>
            </div>
        }

        return <div className={this.getClassNames().join(' ')} id={this.props.id}>
            <a className="toggle" onClick={e => this.onToggle(e)}><span>Insert block</span></a>
            <React.addons.CSSTransitionGroup transitionName="stream-menu" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {menu}
            </React.addons.CSSTransitionGroup>
        </div>;
    }
}

class StreamChild extends React.Component {
    render() {
        let isDeleted = this.props.isDeleted ? this.props.isDeleted : '';
        let actionButtons = [];

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
                {renderBlock(this.props.store, this.props.value, this.props.schema, this.props.path)}
            </div>
            { (this.props.store.getState().length < this.props.parentSchema.maxNum) ? (
                <StreamMenu
                    id={`${this.props.path}-appendmenu`}
                    schema={this.props.parentSchema}
                    onAddItem={this.props.onAddItem}
                />
            ) : null }
        </li>;
    }
}

export class StreamBlock extends React.Component {
    newChildBlock(type, position) {
        this.props.store.dispatch({
            type: 'NEW_CHILD_BLOCK',
            path: this.props.path,
            position: position,
            blockType: type,
        });
    }

    deleteChildBlock(position) {
        this.props.store.dispatch({
            type: 'DELETE_CHILD_BLOCK',
            path: this.props.path,
            position: position,
        });
    }

    moveChildBlock(position, to) {
        this.props.store.dispatch({
            type: 'MOVE_CHILD_BLOCK',
            path: this.props.path,
            position: position,
            to: to,
        });
    }

    render() {
        let childBlocks = [];

        for (let id in this.props.value) {
            let path = `${this.props.path}-${id}`;
            let type = this.props.value[id].type;
            let value = this.props.value[id].value;
            let schema = this.props.schema.child_blocks[type];
            let isFirst = id == 0;
            let isLast = id == this.props.value.length - 1;
            let isDeleted = this.props.value[id].isDeleted;

            childBlocks.push(<StreamChild
                key={id}
                index={id}
                store={this.props.store}
                path={path}
                type={type}
                value={value}
                schema={schema}
                parentSchema={this.props.schema}
                onAddItem={type => this.newChildBlock(type, parseInt(id) + 1)}
                isFirst={isFirst}
                isLast={isLast}
                isDeleted={isDeleted}
                onDeleteItem={() => this.deleteChildBlock(parseInt(id))}
                onMoveUpItem={() => this.moveChildBlock(parseInt(id), parseInt(id) - 1)}
                onMoveDownItem={() => this.moveChildBlock(parseInt(id), parseInt(id) + 1)}
            />);
        }

        return <div className="field block_field block_widget ">
            <div className="field-content">
                <div className="input  ">
                    <div className="sequence-container sequence-type-stream">
                        <input type="hidden" name="body-count" id="body-count" value={childBlocks.length} />
                        { (childBlocks.length < this.props.schema.maxNum) ? (
                        <StreamMenu
                            id={`${this.props.path}-prependmenu`}
                            schema={this.props.schema}
                            onAddItem={type => this.newChildBlock(type, 0)}
                        />
                        ) : null }

                        <div className="sequence-container-inner">
                            <ul id="body-list" className="sequence">
                                {childBlocks}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
