import API_URL from 'settings';
import * as types from '../constants/ActionTypes';
import * as api from 'sources/api';

import {subscribeToChannel} from 'sources/faye';

// NOTE:Chat actions

export function fetchMessages(channelId) {
    return dispatch => {
        dispatch({
            type: types.LOAD_MESSAGES
        });
        return api.fetchMessages(channelId).then(
            data => dispatch({
                type: types.LOAD_MESSAGES_SUCCESS,
                data,
                channelId
            })
        )
    }
}


export function sendMessage(channelId, message) {
    return dispatch => {
        dispatch({
            type: types.SEND_MESSAGE
        });
        return api.sendMessage(channelId, message).then(
            data => dispatch({
                type: types.SEND_MESSAGE_SUCCESS,
                channelId,
                data
            })
        )
    }
}

export function deleteMessage(channelId, msgId) {
    return dispatch => {
        dispatch({
            type: types.DELETE_MESSAGE
        });
        return api.deleteMessage(channelId, msgId).then(
            data => dispatch({
                type: types.DELETE_MESSAGE_SUCCESS,
                channelId,
                msgId
            })
        );
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
                    dispatch({
                        type: types.JOIN_CHANNEL,
                        channelId: ch.id
                    });
                    subscribeToChannel(ch.id, dispatch);
                });
                return dispatch({
                    type: types.LOAD_ACCOUNT_INFO_SUCCESS,
                    data
                });
            }
        );
    };
}

export function receiveMessage(channelId, message) {
    return {
        type: types.RECEIVE_MESSAGE,
        channelId: channelId,
        data: message
    }   
}

export function changeChannel(channelId) {
    return dispatch => {
        dispatch({
            type: types.CHANGE_CHANNEL,
            channelId: channelId
        });
        return dispatch(fetchMessages(channelId));
    }
}
