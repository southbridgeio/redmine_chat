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
                data: state.data.filter((m) => m.id !== action.msgId)
            };

        default:
            return state;
    }
}
