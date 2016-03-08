import * as types from 'actionTypes';
import Faye from 'faye';

let client = new Faye.Client('/redmine-chat/chat') ;

export function subscribeToChannel(channelId, dispatch) {
    client.subscribe(`/chat/${channelId}`, (message) => {
        switch (message.type) {
            case "message_new":
                dispatch({
                    type: types.SEND_MESSAGE_SUCCESS,
                    channelId: message.payload.chat_id,
                    data: message.payload
                });
            break;
        }
    }).then(function() {
        console.log('subscribed');
    });
}

