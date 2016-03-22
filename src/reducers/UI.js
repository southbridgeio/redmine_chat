import * as types from 'actionTypes';

const initialState = {
    minimized: window.localStorage ? (window.localStorage.getItem('minimized')) : true
}

export default function(state=initialState, action) {
    switch (action.type) {
    case types.MINIMIZE_CHAT:
        window.localStorage && window.localStorage.setItem('minimized', true);
        return {
            ...state,
            minimized: true
        }
    case types.CHANGE_CHANNEL:
    case types.MAXIMIZE_CHAT:
        window.localStorage && window.localStorage.setItem('minimized', false);
        return {
            ...state,
            minimized: false
        }
    default:
        return state;
    }
}
