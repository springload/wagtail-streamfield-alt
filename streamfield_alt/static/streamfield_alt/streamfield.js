import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import StreamField from './containers/StreamField';
import configureStore from './store/configureStore';

export function init(element, schema, minNum=null, maxNum=null) {
    const store = configureStore();

    // Get data
    const dataElement = element.querySelector('input[type="hidden"]');
    const data = JSON.parse(dataElement.value);

    render(
        <Provider store={ store }>
            <StreamField initBlocks={data} schema={schema} minNum={minNum} maxNum={maxNum} path="body" />
        </Provider>,
        element.querySelector('div.streamfield-alt-ui')
    );
};
