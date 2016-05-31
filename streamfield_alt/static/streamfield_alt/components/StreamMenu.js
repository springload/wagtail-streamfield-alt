import * as React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class StreamMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    getClassNames() {
        const classNames = ['stream-menu'];

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
        const choices = [];

        for (let choice in this.props.schema.child_blocks) {
            const schema = this.props.schema.child_blocks[choice];

            const onClick = e => {
                this.props.newChildBlock(choice, this.props.index, this.props.schema);

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
            <ReactCSSTransitionGroup transitionName="stream-menu" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {menu}
            </ReactCSSTransitionGroup>
        </div>;
    }
}
