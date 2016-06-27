import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import IntelligentStreamChild from '../containers/IntelligentStreamChild';
import IntelligentStreamMenu from '../containers/IntelligentStreamMenu';

export default class StreamBlock extends React.Component {
    constructor(props) {
        super(props);
        this.shouldShowStreamMenu = this.shouldShowStreamMenu.bind(this);
    }

    componentDidMount() {
        if (this.props.initBlocks) {
            this.props.setInitialState(this.props.initBlocks);
        }
    }

    shouldShowStreamMenu(childBlocks) {
        const {maxNum, deletedItems} = this.props;

        if (maxNum !== null && typeof(maxNum) !== 'undefined') {
            return ((childBlocks.length - deletedItems) < maxNum)
        }

        return true;
    }

    render() {
        const {
            path,
            deletedItems,
            blocks,
            maxNum,
        } = this.props;

        let initBlocks = this.props.initBlocks ? this.props.initBlocks : [];

        let childBlocks = [];
        for (let id in blocks) {
            const blockValue = blocks[id];
            const {uuid, type, value, preview, errors, isDeleted} = blockValue;
            const path = `${path}-${id}`;
            const pathValue = `${path}-${id}-value`;
            const schema = this.props.schema.child_blocks[type];
            const isFirst = id == 0 && !isDeleted;
            const isLast = id == (blocks.length - (deletedItems + 1));

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
                streamFieldValue={blocks}
                maxNum={maxNum}
                preview={preview}
                types={this.props.types}
            />);
        }

        const shouldShowStreamMenu = this.shouldShowStreamMenu(childBlocks);

        return <div className="field block_field block_widget">
            <div className="field-content">
                <div className="input">
                    <div className="sequence-container sequence-type-stream">
                        <input
                        type="hidden"
                        name="body-count"
                        id="body-count"
                        value={blocks ? blocks.length : initBlocks.length}
                        />

                        {shouldShowStreamMenu ? (
                            <IntelligentStreamMenu
                                id={`${path}-prependmenu`}
                                index={0}
                                schema={this.props.schema}
                            />
                        ) : null}

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
