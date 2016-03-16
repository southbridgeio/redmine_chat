import * as types from 'actionTypes';

let newMessageSound = new Audio(require('sounds/newmessage.mp3'));

export const soundNotification = store => next => action => {
    if (action.type == types.RECEIVE_MESSAGE) {
        newMessageSound.play();
    }
    return next(action);
}

export const popupNotification = store => next => action => {
    return next(action);
}
