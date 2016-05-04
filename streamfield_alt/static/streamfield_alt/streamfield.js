import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore} from 'redux';

import {renderBlock, getBlockReducer} from './blocks';


export function init(element, schema, minNum=null, maxNum=null) {
    function reducer(state=null, action) {
        if (action.type === 'SET_INITIAL_STATE') {
            return action.state;
        }

        if (action.path) {
            let pathComponents = action.path.split('-');
            let fieldName = pathComponents.shift();

            let newAction = Object.assign({}, action, {
                pathComponents,
                fieldName,
            });

            return getBlockReducer(schema)(state, newAction);
        }

        return state;
    }

    schema.minNum = minNum;
    schema.maxNum = maxNum;

    let store = createStore(reducer);


    let uiElement = element.querySelector('div.streamfield-alt-ui')
    store.subscribe(() => {
        // Render
        ReactDOM.render(renderBlock(store, store.getState(), schema, 'body'), uiElement);
    });


    // Get data
    let dataElement = element.querySelector('input[type="hidden"]');
    let data = JSON.parse(dataElement.value);

    store.dispatch({
        type: 'SET_INITIAL_STATE',
        state: data,
    });
}
