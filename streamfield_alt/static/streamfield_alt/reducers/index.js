import {getBlockReducer} from '../blocks';
import { combineReducers } from 'redux';

const stateDefaults = {
  blocks: [],
  deletedItems: 0,
}

export function streamField(state=stateDefaults, action) {
    switch(action.type) {
        case 'SET_INITIAL_STATE':
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
        case 'NEW_CHILD_BLOCK':
            const newBlock = {
                type: action.blockType,
                value: action.schema.child_blocks[action.blockType].default_value,
            };

            let blocks = [...state.blocks];
            if (action.position === 0) {
                blocks.unshift(newBlock);
            } else {
                blocks = [
                    blocks.slice(0, action.position),
                    newBlock,
                    blocks.slice(action.position),
                ]
            }

            return Object.assign({}, state, {
                blocks: blocks,
            });
        case 'DELETE_CHILD_BLOCK':
            const oldBlocks = [...state.blocks];
            const deletedChild = oldBlocks[action.position];
            deletedChild['isDeleted'] = true;
            const newBlocks = oldBlocks.filter((child, index) => index !== action.position);
            newBlocks.push(deletedChild);

            return Object.assign({}, state, {
                blocks: newBlocks,
                deletedItems: action.deletedItems + 1,
            });
        case 'MOVE_CHILD_BLOCK':
            const arr = [...state.blocks];
            arr.splice(action.to, 0, arr.splice(action.position, 1)[0]);

            return Object.assign({}, state, {
                blocks: arr,
            });
    }

    return state;

    // if (action.path) {
    //     const pathComponents = action.path.split('-');
    //     const fieldName = pathComponents.shift();

    //     const newAction = Object.assign({}, action, {
    //         pathComponents,
    //         fieldName,
    //     });

    //     return getBlockReducer(schema)(state, newAction);
    // }

    // return state;
}

const rootReducer = combineReducers({
    streamField,
});

export default rootReducer;
