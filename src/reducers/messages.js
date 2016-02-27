import * as types from '../constants/ActionTypes';

const initialState = {
    loaded: false,
    data: [],
    fetchHistory: []
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case types.SEND_MESSAGE_SUCCESS:
            return {...state,
                data: [...state.data, action.data]
            }
        case types.LOAD_MESSAGES:
            return {...state,
                loading: true
            };
        case types.LOAD_MESSAGES_SUCCESS:
            return {...state,
                loading: false,
                loaded: true,
                data: action.data.messages.reverse()
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
