import * as types from 'actionTypes';

export const accountInitialState = {
    loaded: false,
    settings: {
        notificationsEnabled: window.localStorage ? (window.localStorage.getItem('notificationsEnabled')) : true
    }
};

export default function account(state = accountInitialState, action) {
    switch (action.type) {
        case types.LOAD_ACCOUNT_INFO_SUCCESS:
            return {...state,
                loaded: true,
            }
        case types.TOGGLE_NOTIFICATIONS:
            window.localStorage && window.localStorage.setItem('notificationsEnabled', !state.settings.notificationsEnabled);
            return {...state,
                settings: {...state.settings,
                    notificationsEnabled: !state.settings.notificationsEnabled
                }
            }
        default:
            return state;
    }
}
