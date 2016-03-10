import account from './account';
import chats from './chats';
import UI from './UI';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    account,
    chats,
    UI
});

export default rootReducer;
