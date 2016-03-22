import * as types from 'actionTypes';
import { changeChannel } from 'actions/actions';

let newMessageSound = new Audio(require('sounds/newmessage.mp3'));

// Setup notifications
let showNotifications;

if (Notification && Notification.permission === 'default') {
    Notification.requestPermission();
}

export const soundNotification = store => next => action => {
    if ((action.type == types.RECEIVE_MESSAGE) && store.getState().account.settings.notificationsEnabled) {
        newMessageSound.play();
    }
    return next(action);
}

export const popupNotification = store => next => action => {
    if ((action.type === types.RECEIVE_MESSAGE) && ((action.data.channelId !== store.getState().chats.currentChannel) || !document.hasFocus()) && store.getState().account.settings.notificationsEnabled) {
        if (('Notification' in window) && Notification.permission === 'granted') {
            let n = new Notification(action.data.name, {
                body: action.data.message
            });
            n.onclick = () => {
                window.focus();
                store.dispatch(changeChannel(action.channelId));
                n.close();
            }
        }
    }
    return next(action);
}
