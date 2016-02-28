import account from './account';
import chats from './chats';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    account,
    chats
});

export default rootReducer;
