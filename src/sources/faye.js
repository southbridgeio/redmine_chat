import * as types from 'actionTypes';

let client = new Faye.Client('/redmine-chat/chat'),
    subscriptions = {};

export function unsubscribeFromChannel(channelId) {
    channelId = Number(channelId);
    if (channelId in subscriptions) {
        subscriptions[channelId].cancel();
        delete subscriptions[channelId];
    }
}
export function subscribeToChannel(channelId, dispatch) {
    channelId = Number(channelId);
    if (channelId in subscriptions) return; 
        
    subscriptions[channelId] = client.subscribe(`/chat/${channelId}`, (message) => {
        switch (message.type) {
        case "message_new":
            dispatch({
                type: types.RECEIVE_MESSAGE,
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
    });
}

