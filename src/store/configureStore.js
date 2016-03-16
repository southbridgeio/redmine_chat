import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { popupNotification, soundNotification } from 'middlewares/notifications';
import { ownMessageFilter } from 'middlewares/ownMsgFilter';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk, ownMessageFilter, popupNotification, soundNotification)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
