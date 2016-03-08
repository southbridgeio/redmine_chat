import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

import {joinChannel} from 'actions/actions';
import App from './app';


let methods = {};

methods.joinChat = (chatId) => {
    console.log("Chat is not initialized");
}

methods.initChatFull = (container, opts) => {
    console.log("initializing chat");
    const store = configureStore();
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        container 
    );
    methods.joinChat = (chatId) => {
        store.dispatch(joinChannel(chatId));
    }
}


module.exports = methods; 

methods.initChatFull( document.getElementById('ChatApp'))
