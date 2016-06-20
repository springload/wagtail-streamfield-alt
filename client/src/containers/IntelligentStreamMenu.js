import { connect } from 'react-redux'
import StreamMenu from '../components/StreamMenu'
import * as actions from '../actions';

const mapDispatchToProps = (dispatch) => {
  return {
    newChildBlock: (type, position, schema) => {
        dispatch(actions.newChildBlock(type, position, schema))
    },
  }
}

const IntelligentStreamMenu = connect(
    null,
    mapDispatchToProps
)(StreamMenu)

export default IntelligentStreamMenu;
