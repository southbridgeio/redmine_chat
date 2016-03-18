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
    lastVisited = new Date(lastVisited).getTime();
    return messages.filter(msg => {
        return new Date(msg.created_at).getTime() > lastVisited;
    }).length;
}
const initialState = {
    loaded: false,
    channels: {},
    messages: {}
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case types.JOIN_CHANNEL_SUCCESS:
            return {...state, 
                channels: {
                    ...state.channels,
                    [action.channelId] : action.channel 
                },
                messages: {
                    ...state.messages,
                    [action.channelId]: []
                }
            }
        case types.LEAVE_CHANNEL_SUCCESS:
            let newState = Object.assign({}, state);
            delete newState.channels[action.channelId];
            delete newState.messages[action.channelId];
            return newState;

        case types.RECEIVE_MESSAGE:
            return {...state,
                messages: {...state.messages,
                    [action.channelId]: unique([...state.messages[action.channelId], action.data], (el) => el.id)
                }
            }
        case types.RECEIVE_MESSAGE:
        case types.SEND_MESSAGE_SUCCESS:
            return {...state,
                messages: {...state.messages,
                    [action.channelId]: unique([...state.messages[action.channelId], action.data], el => el.id)
                }
            }
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
                        unreadCount: getUnreadCount(state.channels[action.channelId].last_visited_at, action.data.messages)
                    }
                },
                messages: {
                    ...state.messages,
                    [action.channelId]: action.data.messages.reverse()
                }
            };
        case types.LOAD_MESSAGES_FAIL:
            return {...state,
                loading: false,
                loaded: false,
                error: action.error,
                data: [...state.data]
            };
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
        default:
            return state;
    }
}
