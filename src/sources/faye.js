import * as types from 'actionTypes';
import Faye from 'faye';

let client = new Faye.Client('/redmine-chat/chat') ;

export function subscribeToChannel(channelId, dispatch) {
    channelId = Number(channelId);
    client.subscribe(`/chat/${channelId}`, (message) => {
        switch (message.type) {
        case "message_new":
            dispatch({
                type: types.SEND_MESSAGE_SUCCESS,
                channelId: message.payload.chat_id,
                data: message.payload
            });
        break;
        case 'user_join':
            dispatch({
                type: types.USER_JOIN,
                channelId,
                userId: Number(message.payload.id),
                user: message.payload
            })
        break;
        case 'user_exit':
            dispatch({
                type: types.USER_LEAVE,
                channelId,
                userId: Number(message.payload.id),
                user: message.payload
            })
        break;
        }
    })
}

