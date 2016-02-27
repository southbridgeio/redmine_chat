import API_URL from 'settings';
import * as types from '../constants/ActionTypes';
import * as api from 'sources/api';

import {subscribeToChannel} from 'sources/faye';

// NOTE:Chat actions

export function fetchMessages(channel) {
    return dispatch => {
        dispatch({
            type: types.LOAD_MESSAGES
        });
        return api.fetchMessages(channel).then(
            data => dispatch({
                type: types.LOAD_MESSAGES_SUCCESS,
                data,
                channel
            })
        )
    }
}


export function sendMessage(chatId, message) {
    return dispatch => {
        dispatch({
            type: types.SEND_MESSAGE
        });
        return api.sendMessage(chatId, message).then(
            data => dispatch({
                type: types.SEND_MESSAGE_SUCCESS,
                data
            })
        )
    }
}

export function deleteMessage(chatId, msgId) {
    return dispatch => {
        dispatch({
            type: types.DELETE_MESSAGE
        });
        return api.deleteMessage(chatId, msgId).then(
            data => dispatch({
                type: types.DELETE_MESSAGE_SUCCESS,
                chatId,
                msgId
            })
        )
    }
}


export function loadAccountInfo() {
    return dispatch => {
        dispatch({
            type: types.LOAD_ACCOUNT_INFO
        });
        api.fetchAccountInfo().then(
            data => {
                data.chats.forEach((ch) => {
                   subscribeToChannel(ch.id) 
                });
                return dispatch({
                    type: types.LOAD_ACCOUNT_INFO_SUCCESS,
                    data
                });
            }
        );
    }
}
