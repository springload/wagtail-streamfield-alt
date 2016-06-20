import { connect } from 'react-redux'
import StreamChild from '../components/StreamChild'
import * as actions from '../actions';

const mapStateToProps = (state) => {
    return {
        deletedItems: state.streamField.deletedItems,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteChildBlock: (position, deletedItems) => {
        dispatch(actions.deleteChildBlock(position, deletedItems))
    },
    moveChildBlock: (position, to) => {
        dispatch(actions.moveChildBlock(position, to))
    },
  }
}

const IntelligentStreamChild = connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamChild)

export default IntelligentStreamChild;
