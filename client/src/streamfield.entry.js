import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import IntelligentStreamBlock from './containers/IntelligentStreamBlock';
import configureStore from './store/configureStore';

export function init(element, schema, minNum=null, maxNum=null) {
    const stateDefaults = {
      blocks: [],
      deletedItems: 0,
    }
    const store = configureStore(stateDefaults);

    // Get data
    const dataElement = element.querySelector('input[type="hidden"]');
    const data = JSON.parse(dataElement.value);

    render(
        <Provider store={ store }>
            <IntelligentStreamBlock initBlocks={data} schema={schema} minNum={minNum} maxNum={maxNum} path="body" />
        </Provider>,
        element.querySelector('div.streamfield-alt-ui')
    );
};
