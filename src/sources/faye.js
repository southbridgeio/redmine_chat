import Faye from 'faye';
import {WS_URL} from 'settings';


const Client = new Faye.Client(WS_URL);

Client.on('transport:up', () => {
    console.log('transport up');
});

function onChannelMessage(message) {
    console.log(message);
}

export function subscribeToChannel(channelId) {
    Client.then(() => {
        console.log('subscribing');
        Client.subscribe('chat/}', onChannelMessage).then(() => {
            console.log('subscribed');
        }, (err) => console.log(err));
    })
}
