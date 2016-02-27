import _ from 'lodash';
import * as types from '../constants/ActionTypes';

const initialState = {
    loaded: false,
    currentChannel: 1,
    channels: []
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_ACCOUNT_INFO_SUCCESS:
            return {...state,
                loaded: true,
                channels: action.data.chats.reduce((memo, channel) => {
                    memo[channel.id] = channel;
                    return memo;
                }, {})
            }
        break;
        default:
            return state;
    }
}
