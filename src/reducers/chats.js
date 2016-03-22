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
export const chatsInitialState = {
    loading: false,
    loaded: false,
    channels: {},
    messages: {},
    currentChannel: null,
    activeFilter: {
        starred: false,
        search: null
    }
};

export default function chats(state = chatsInitialState, action) {
    let newState;
    if (action.channelId) {
        action.channelId = Number(action.channelId);
    }
    switch (action.type) {
        case types.CHANGE_CHANNEL:
            return {...state,
                currentChannel: action.channelId,
                activeFilter: chatsInitialState.activeFilter
            }
        break;
        case types.JOIN_CHANNEL_SUCCESS:
            newState = {...state, 
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
            if (state.currentChannel === null) {
                newState.currentChannel = action.channelId;
            }
            return newState;
        break;

        case types.LEAVE_CHANNEL_SUCCESS:
            newState = Object.assign({}, state);
            delete newState.channels[action.channelId];
            delete newState.messages[action.channelId];

            if (action.channelId == newState.currentChannel) {
                newState.currentChannel = Object.keys(newState.channels)[0] || null; 
                newState.activeFilter = chatsInitialState.activeFilter; 
            }
            return newState;
        break;

        case types.RECEIVE_MESSAGE:
        case types.SEND_MESSAGE_SUCCESS:
            if (state.activeFilter.starred || state.activeFilter.search) return state;
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
        break;

        case types.LOAD_MESSAGES:
            return {...state,
                loading: true
            };
        break;

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
        break;

        case types.LOAD_MESSAGES_FAIL:
            return {...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        break;

        case types.UPDATE_MESSAGE_SUCCESS:
            return {...state,
                messages: {...state.messages,
                    [action.channelId]: {...state.messages[action.channelId],
                        [action.msgId]: Object.assign({}, state.messages[action.channelId][action.msgId], action.data)
                    }
                }
            }
        break;

        case types.DELETE_MESSAGE_SUCCESS:
            return {...state,
                messages: {...state.messages,
                    [action.channelId] : _.without(state.messages[action.channelId], action.msgId)
                }
            };
        break;

        case types.USER_JOIN:
            if (!state.channels[action.channelId]) return state;
            return {...state,
                channels: {...state.channels,
                    [action.channelId] : {...state.channels[action.channelId],
                        users: state.channels[action.channelId].users.concat([action.user])
                    }
                }
            }
        break;

        case types.USER_LEAVE:
            if (!state.channels[action.channelId]) return state;
            return {...state,
                channels: {...state.channels,
                    [action.channelId] : {...state.channels[action.channelId],
                        users: state.channels[action.channelId].users.filter(u => u.id != action.userId)
                    }
                }
            }
        break;

        case types.UPDATE_CHANNEL_LAST_VISITED_SUCCESS:
            return {...state,
                channels: {...state.channels,
                    [action.channelId]: {...state.channels[action.channelId],
                        last_visited_at: action.data.last_visited_at,
                        unreadCount: getUnreadCount(action.data.last_visited_at, state.messages[action.channelId])
                        
                    }
                }                
            }
        break;

        case types.APPLY_FILTER:
            return {...state,
                activeFilter: {...state.activeFilter,
                    ...action.filter
                }
            }
        break;

        case types.LOAD_MORE_MESSAGES:
            return {...state, 
                loading: true
            }
        break;

        case types.LOAD_MORE_MESSAGES_SUCCESS:
            return {...state,
                loading: false,
                channels: {...state.channels,
                    [action.channelId]: {
                        ...state.channels[action.channelId],
                        totalMessages: action.data.total,
                        loadedMessages: state.channels[action.channelId].loadedMessages + action.data.messages.length,
                    }

                },
                messages: {...state.messages,
                    [action.channelId]: {
                        ..._.indexBy(action.data.messages, 'id'),
                        ...state.messages[action.channelId]
                    }
                }
            }

        default:
            return state;
    }
}
