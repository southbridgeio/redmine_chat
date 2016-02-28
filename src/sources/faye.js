import {WS_URL} from 'settings';

var token = null;

export function setWsToken(authToken) {
    token = authToken;
}
const TYPE_MAP = {
    "message_new": "RECEIVE_MESSAGE"
}
var chatSockets = {};

function handler(channelId, dispatch) {
    return function onChannelMessage(message) {
        try {
            message = JSON.parse(message.data);
        } catch(e) {
            return console.log('error parsing');
        }
        if (message.type === "message_new") {

            dispatch({
                type: "RECEIVE_MESSAGE",
                channelId: message.payload.chat_id,
                data:  {
                    id: message.payload.id,
                    created_at: message.payload.created_at,
                    name: message.payload.name,
                    message: message.payload.message
                }
            });
        }

    } 
}

export function subscribeToGlobal(dispatch) {
    return;
    const globalUpdates = new WebSocket(`${WS_URL}/user_events?token=${token}`)
    globalUpdates.onopen = () => {
        console.log('socket opened');
    }
    globalUpdates.onmessage = () => {
        console.log(arguments);
    }
}
export function subscribeToChannel(channelId, dispatch) {
    if (!chatSockets[channelId]) {
        const socket = new WebSocket(`${WS_URL}/${channelId}/events?token=${token}`);
        socket.onmessage = handler(channelId, dispatch);
        socket.onerror = function (error) {
            console.log("Ошибка " + error.message);
        };
        socket.onopen = function (e) {
            return console.log('socket opened');
        };       
    }
}
