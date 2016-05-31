import { connect } from 'react-redux'
import StreamBlock from '../components/StreamBlock'
import * as actions from '../actions';

const mapStateToProps = (state) => {
    return {
        deletedItems: state.streamField.deletedItems,
        blocks: state.streamField.blocks,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInitialState: (blocks) => {
        dispatch(actions.setInitialState(blocks))
    },
  }
}

const StreamField = connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamBlock)

export default StreamField;
