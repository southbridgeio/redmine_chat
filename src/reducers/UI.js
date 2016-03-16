import * as types from 'actionTypes';

const initialState = {
    minimized: true
}

export default function(state=initialState, action) {
    switch (action.type) {
    case types.MINIMIZE_CHAT:
        return {
            ...state,
            minimized: true
        }
    case types.CHANGE_CHANNEL:
    case types.MAXIMIZE_CHAT:
        return {
            ...state,
            minimized: false
        }
    default:
        return state;
    }
}
