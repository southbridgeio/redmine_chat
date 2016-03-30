import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

import { setAuthToken } from 'sources/api';

import {joinChannel} from 'actions/actions';
import App from './app';

import { accountInitialState } from 'reducers/account';
import { chatsInitialState } from 'reducers/chats';

let methods = {};

methods.joinChat = (chatId) => {
    console.log("Chat is not initialized");
}

methods.initChatFull = (container, opts) => {
    console.log("initializing chat");
    const store = configureStore({
        minimized: typeof(opts.minimized) === 'undefined' ? true : opts.minimized
    });
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

methods.initChatSingleChannel = (container, opts) => {
    console.log("initializing single channel chat");
    if (!'channelId' in opts) {
        throw new Error("Single chat constructor requires channelId option");
    }
    if ('authToken' in opts) {
        setAuthToken(opts.authToken);
    }
    const store = configureStore({
        account: Object.assign({}, accountInitialState, {
            singleChannel: opts.channelId
        }),
        chats: Object.assign({}, chatsInitialState, {
            currentChannel: opts.channelId
        }),
        minimized: typeof(opts.minimized) === 'undefined' ? true : opts.minimized
    });
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        container 
    );
}


module.exports = methods; 
