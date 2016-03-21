import _ from 'lodash';
import * as types from 'actionTypes';

function unique(arr) {
    var seen = [];
    return arr.reduce((memo, el) => {
        if (seen.indexOf(el.id) === -1) {
            seen.push(el.id);
            memo.push(el);
        }
        return memo;
    }, []);
}

function getUnreadCount(lastVisited, messages) {
    return _.filter(messages, msg => {
        return msg.created_at > lastVisited;
    }).length;
}
const initialState = {
    loaded: false,
    channels: {},
    messages: {}
};

export default function messages(state = initialState, action) {
    let newState;
    switch (action.type) {
        case types.JOIN_CHANNEL_SUCCESS:
            return {...state, 
                channels: {
                    ...state.channels,
                    [action.channelId] : {
                        ...action.channel,
                        totalMessages: 0,
                        loadedMessages: 0
                    }
                },
                messages: {
                    ...state.messages,
                    [action.channelId]: {}
                }
            }

        case types.LEAVE_CHANNEL_SUCCESS:
            newState = Object.assign({}, state);
            delete newState.channels[action.channelId];
            delete newState.messages[action.channelId];
            return newState;
        break;

        case types.RECEIVE_MESSAGE:
        case types.SEND_MESSAGE_SUCCESS:
            newState = {...state,
                messages: {...state.messages,
                    [action.channelId]: {
                        ...state.messages[action.channelId],
                        [action.data.id]:  action.data
                    }
                },
                channels: { ...state.channels,
                    [action.channelId]: {
                        ...state.channels[action.channelId],
                        totalMessages: state.channels[action.channelId].totalMessages++,
                        loadedMessages: state.channels[action.channelId].loadedMessages++
                    }
                }
            }
            newState.channels[action.channelId].unreadCount = getUnreadCount(newState.channels[action.channelId].last_visited_at, newState.messages[action.channelId]);
            return newState;

        case types.LOAD_MESSAGES:
            return {...state,
                loading: true
            };

        case types.LOAD_MESSAGES_SUCCESS:
            return {...state,
                loading: false,
                loaded: true,
                channels: {
                    ...state.channels,
                    [action.channelId]: {
                        ...state.channels[action.channelId],
                        unreadCount: getUnreadCount(state.channels[action.channelId].last_visited_at, action.data.messages),
                        loadedMessages: action.data.messages.length,
                        totalMessages: action.data.total
                    }
                },
                messages: {
                    ...state.messages,
                    [action.channelId]: _.indexBy(action.data.messages, 'id')
                }
            };

        case types.LOAD_MESSAGES_FAIL:
            return {...state,
                loading: false,
                loaded: false,
                error: action.error,
            };

        case types.UPDATE_MESSAGE_SUCCESS:
            return {...state,
                messages: {...state.messages,
                    [action.channelId]: {...state.messages[action.channelId],
                        [action.msgId]: Object.assign({}, state.messages[action.channelId][action.msgId], action.data)
                    }
                }
            }

        case types.DELETE_MESSAGE_SUCCESS:
            return {...state,
                messages: {...state.messages,
                    [action.channelId] : _.without(state.messages[action.channelId], action.msgId)
                }
            };

        case types.USER_JOIN:
            if (!state.channels[action.channelId]) return state;
            return {...state,
                channels: {...state.channels,
                    [action.channelId] : {...state.channels[action.channelId],
                        users: state.channels[action.channelId].users.concat([action.user])
                    }
                }
            }

        case types.USER_LEAVE:
            if (!state.channels[action.channelId]) return state;
            return {...state,
                channels: {...state.channels,
                    [action.channelId] : {...state.channels[action.channelId],
                        users: state.channels[action.channelId].users.filter(u => u.id != action.userId)
                    }
                }
            }


        case types.UPDATE_CHANNEL_LAST_VISITED_SUCCESS:
            return {...state,
                channels: {...state.channels,
                    [action.channelId]: {...state.channels[action.channelId],
                        last_visited_at: action.data.last_visited_at,
                        unreadCount: getUnreadCount(action.data.last_visited_at, state.messages[action.channelId])
                        
                    }
                }                
            }

        default:
            return state;
    }
}
