import {getBlockReducer} from '../blocks';
import { combineReducers } from 'redux';

const stateDefaults = {
  blocks: [],
  deletedItems: 0,
}

const setInitialState = (state, action) => {
    let deletedItems = 0;
    for (let id in action.blocks) {
        if(action.blocks[id].isDeleted) {
            deletedItems++;
        }
    }
    return Object.assign({}, state, {
        deletedItems: deletedItems,
        blocks: action.blocks,
    });
};

const newChildBlock = (state, action) => {
    const newBlock = {
        type: action.blockType,
        value: action.schema.child_blocks[action.blockType].default_value,
    };

    let blocks = [...state.blocks];
    if (action.position === 0) {
        blocks.unshift(newBlock);
    } else {
        blocks.splice(action.position, 0, newBlock);
    }

    return Object.assign({}, state, {
        blocks: blocks,
    });
};

const deleteChildBlock = (state, action) => {
    const oldBlocks = [...state.blocks];
    const deletedChild = oldBlocks[action.position];
    deletedChild['isDeleted'] = true;
    const newBlocks = oldBlocks.filter((child, index) => index !== action.position);
    newBlocks.push(deletedChild);

    return Object.assign({}, state, {
        blocks: newBlocks,
        deletedItems: action.deletedItems + 1,
    });
};

const moveChildBlock = (state, action) => {
    const arr = [...state.blocks];
    arr.splice(action.to, 0, arr.splice(action.position, 1)[0]);

    return Object.assign({}, state, {
        blocks: arr,
    });
};

export function streamField(state=stateDefaults, action) {
    switch(action.type) {
        case 'SET_INITIAL_STATE':
            return setInitialState(state, action);
        case 'NEW_CHILD_BLOCK':
            return newChildBlock(state, action);
        case 'DELETE_CHILD_BLOCK':
            return deleteChildBlock(state, action);
        case 'MOVE_CHILD_BLOCK':
            return moveChildBlock(state, action);
    }

    return state;
}

const rootReducer = combineReducers({
    streamField,
});

export default rootReducer;
