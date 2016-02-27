import account from './account';
import messages from './messages';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    account,
    messages
});

export default rootReducer;
