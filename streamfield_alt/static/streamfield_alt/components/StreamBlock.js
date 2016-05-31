import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import StreamChild from './StreamChild';
import StreamMenu from '../containers/StreamMenu';

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
            const type = this.props.blocks[id].type;
            const value = this.props.blocks[id].value;
            const schema = this.props.schema.child_blocks[type];
            const isDeleted = this.props.blocks[id].isDeleted;
            const isFirst = id == 0 && !isDeleted;
            const isLast = id == this.props.blocks.length - (this.props.deletedItems + 1);

            childBlocks.push(<StreamChild
                key={id}
                index={id}
                path={path}
                type={type}
                value={value}
                schema={schema}
                parentSchema={this.props.schema}
                onAddItem={(type, id, schema) => this.props.newChildBlock(type, parseInt(id) + 1, schema)}
                isFirst={isFirst}
                isLast={isLast}
                isDeleted={isDeleted}
                onDeleteItem={() => this.props.deleteChildBlock(parseInt(id)), this.props.deletedItems}
                onMoveUpItem={() => this.props.moveChildBlock(parseInt(id), parseInt(id) - 1)}
                onMoveDownItem={() => this.props.moveChildBlock(parseInt(id), parseInt(id) + 1)}
                deletedItems={this.props.deletedItems}
                streamFieldValue={this.props.blocks}
                maxNum={this.props.maxNum}
            />);
        }

        return <div className="field block_field block_widget">
            <div className="field-content">
                <div className="input">
                    <div className="sequence-container sequence-type-stream">
                        <input type="hidden" name="body-count" id="body-count" value={this.props.blocks ? this.props.blocks.length : this.props.initBlocks.length} />
                        { ((childBlocks.length - this.props.deletedItems) < this.props.maxNum) ? (
                        <StreamMenu
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
