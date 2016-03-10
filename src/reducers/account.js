import * as types from 'actionTypes';

const initialState = {
    loaded: false,
    currentChannel: null
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case types.LEAVE_CHANNEL_SUCCESS:
            return {...state,
                currentChannel: action.channelId == state.currentChannel ? null : state.currentChannel
            }
        case types.CHANGE_CHANNEL:
            return {...state,
                currentChannel: action.channelId
            }
        case types.LOAD_ACCOUNT_INFO_SUCCESS:
            return {...state,
                loaded: true,
            }
        default:
            return state;
    }
}
