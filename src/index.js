import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import {setAuthToken} from 'sources/api';
import {setWsToken} from 'sources/faye';
import App from './app';


function initChatFull(token, container, opts) {
    setAuthToken(token);
    setWsToken(token);
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

initChatFull(localStorage.getItem('token'), document.getElementById('ChatApp'))
