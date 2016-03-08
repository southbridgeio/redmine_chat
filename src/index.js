import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import {setAuthToken} from 'sources/api';
import {setWsToken} from 'sources/faye';
import App from './app';


function initChatFull(container, opts) {
    console.log("initializing chat");
    const store = configureStore();
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        container 
    );
}


window.__REDMINE_CHAT__ = {
    initChatFull
}
console.log('whoop');
initChatFull( document.getElementById('ChatApp'))
