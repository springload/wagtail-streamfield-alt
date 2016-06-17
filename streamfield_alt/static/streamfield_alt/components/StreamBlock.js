import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import IntelligentStreamChild from '../containers/IntelligentStreamChild';
import IntelligentStreamMenu from '../containers/IntelligentStreamMenu';

export default class StreamBlock extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.initBlocks) {
            this.props.setInitialState(this.props.initBlocks);
        }
    }

    render() {
        let childBlocks = [];
        for (let id in this.props.blocks) {
            const path = `${this.props.path}-${id}`;
            const uuid = this.props.blocks[id].uuid;
            const pathValue = `${this.props.path}-${id}-value`;
            const type = this.props.blocks[id].type;
            const value = this.props.blocks[id].value;
            const preview = this.props.blocks[id].preview;
            const errors = this.props.blocks[id].errors;
            const schema = this.props.schema.child_blocks[type];
            const isDeleted = this.props.blocks[id].isDeleted;
            const isFirst = id == 0 && !isDeleted;
            const isLast = id == (this.props.blocks.length - (this.props.deletedItems + 1));

            childBlocks.push(<IntelligentStreamChild
                key={uuid}
                index={id}
                path={path}
                type={type}
                value={value}
                errors={errors}
                schema={schema}
                parentSchema={this.props.schema}
                isFirst={isFirst}
                isLast={isLast}
                isDeleted={isDeleted}
                streamFieldValue={this.props.blocks}
                maxNum={this.props.maxNum}
                preview={preview}
            />);
        }

        return <div className="field block_field block_widget">
            <div className="field-content">
                <div className="input">
                    <div className="sequence-container sequence-type-stream">
                        <input 
                        type="hidden" 
                        name="body-count" 
                        id="body-count" 
                        value={this.props.blocks ? this.props.blocks.length : this.props.initBlocks.length} 
                        />
                        
                        { ((childBlocks.length - this.props.deletedItems) < this.props.maxNum) ? (
                            <IntelligentStreamMenu
                                id={`${this.props.path}-prependmenu`}
                                index={0}
                                schema={this.props.schema}
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
        </div>
    }
}
