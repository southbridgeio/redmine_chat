import API_URL from 'settings';
import * as types from 'actionTypes';
import * as api from 'sources/api';

import { maximizeChat } from 'actions/UI';
import { subscribeToChannel, unsubscribeFromChannel } from 'sources/faye';

// NOTE:Chat actions

export function fetchMessages(channelId) {
    return (dispatch, getState) => {
        dispatch({
            type: types.LOAD_MESSAGES
        });
        return api.fetchMessages(channelId, getState().chats.activeFilter).then(
            data => dispatch({
                type: types.LOAD_MESSAGES_SUCCESS,
                data,
                channelId
            })
        )
    }
}

export function fetchMoreMessages(channelId) {
    return (dispatch, getState) => {
        if (getState().chats.loading) return;
        dispatch({
            type: types.LOAD_MORE_MESSAGES
        });
        return api.fetchMessages(channelId, Object.assign({}, getState().chats.activeFilter, {offset: getState().chats.channels[channelId].loadedMessages})).then(
            data => dispatch({
                type: types.LOAD_MORE_MESSAGES_SUCCESS,
                data,
                channelId
            }),
            error => dispatch({
                type: types.LOAD_MORE_MESSAGES_FAIL,
                error
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
            data => {
                dispatch({
                    type: types.SEND_MESSAGE_SUCCESS,
                    channelId,
                    data
                });
                dispatch({
                    type: types.UPDATE_CHANNEL_LAST_VISITED_SUCCESS,
                    channelId,
                    data: { last_visited_at: data.created_at }
                })
            },
            err => console.log(error)
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

export function updateMessage(channelId, msgId, message) {
    return dispatch => {
        dispatch({
            type: types.UPDATE_MESSAGE
        });
        return api.updateMessage(channelId, msgId, message).then(
            data => dispatch({
                type: types.UPDATE_MESSAGE_SUCCESS,
                channelId,
                msgId,
                data: message
            })
        )
    } 
}

export function loadAccountInfo() {
    return (dispatch, getState) => {
        dispatch({
            type: types.LOAD_ACCOUNT_INFO
        });
        api.fetchAccountInfo().then(
            data => {
                if (getState().account.singleChannel) {
                    let channel = data.chats.filter(ch => {
                        return Number(ch.id) === getState().account.singleChannel;
                    })[0];
                    if (channel) {
                        dispatch({
                            type: types.JOIN_CHANNEL_SUCCESS,
                            channelId: getState().account.singleChannel,
                            channel
                        });

                        dispatch(fetchMessages(getState().account.singleChannel));
                        subscribeToChannel(getState().account.singleChannel, dispatch);
                    } else {
                        dispatch(joinChannel(getState().account.singleChannel))
                    }
                } else {
                    data.chats.forEach((ch) => {
                        dispatch({
                            type: types.JOIN_CHANNEL_SUCCESS,
                            channelId: Number(ch.id),
                            channel: ch
                        });
                        dispatch(fetchMessages(ch.id));
                        subscribeToChannel(ch.id, dispatch);
                    });
                }
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
        return dispatch({
            type: types.CHANGE_CHANNEL,
            channelId: channelId
        });
    }
}

export function joinChannel(channelId) {
    return dispatch => {
        dispatch({
            type: types.JOIN_CHANNEL,
            channelId
        });
        return api.joinChannel(channelId).then(
            result => {
                dispatch({
                    type: types.JOIN_CHANNEL_SUCCESS,
                    channelId,
                    channel: result
                });
                dispatch(fetchMessages(channelId));
                subscribeToChannel(channelId, dispatch);
                dispatch(changeChannel(channelId));
                dispatch(maximizeChat());
            },
            err => dispatch({
                type: types.JOIN_CHANNEL_FAIL,
                channelId
            })
        );
    }
}

export function leaveChannel(channelId) {
    return dispatch => {
        dispatch({
            type: types.LEAVE_CHANNEL,
            channelId
        });
        return api.leaveChannel(channelId).then(
            result => {
                dispatch({
                    type: types.LEAVE_CHANNEL_SUCCESS,
                    channelId,
                    result
                });
                unsubscribeFromChannel(channelId);
            },
            err => dispatch({
                type: types.LEAVE_CHANNEL_FAIL,
                channelId
            })
        );
    }
}

export function leaveAllChannels() {
    return (dispatch, getState) => {
        Object.keys(getState().chats.channels).forEach(channelId => {
            dispatch(leaveChannel(channelId));
        });
    }
}

export function updateChannelLastVisited(channelId) {
    return dispatch => {
        dispatch({
            type: types.UPDATE_CHANNEL_LASTVISITED
        });
        return api.updateChannelLastVisited(channelId).then(
            data => dispatch({
                type: types.UPDATE_CHANNEL_LASTVISITED_SUCCESS,
                data
            }),
            err => dispatch({
                type: types.UPDATE_CHANNEL_LASTVISITED_FAIL,
                err
            })
        )
    }
}

export function applyFilter(filter) {
    return (dispatch, getState) => {
        let dispatched = dispatch({
            type: types.APPLY_FILTER,
            filter
        });
        if (getState().chats.currentChannel !== null) {
            return dispatch(fetchMessages(getState().chats.currentChannel));
        } else {
            return dispatched;
        }
    }
}


export function toggleNotifications() {
    return {
        type: types.TOGGLE_NOTIFICATIONS
    }
}
