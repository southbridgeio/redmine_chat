import {API_URL} from 'settings';

const token = 'MToxNDU2NDAxMDc0OjE5OTZhYzY2YjQ2ZjgyMzZhNjVjN2Q2ZDE5YWM1YzY2';

function processApiResponse(res) {
    if (res.ok) return res.json();
    throw new Error('Unable to process API response');
};

export function fetchMessages(channel) {
    return fetch(`${API_URL}/chats/${channel}/messages?token=${token}`).then(processApiResponse);
};

export function sendMessage(channel, message) {
    return fetch(`${API_URL}/chats/${channel}/messages?token=${token}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message
        })
    }).then(processApiResponse);
};

export function deleteMessage(channel, msgId) {
    return fetch(`${API_URL}/chats/${channel}/messages/${msgId}?token=${token}`, {
        method: 'delete'
    }).then(processApiResponse);
}


export function fetchAccountInfo() {
    return fetch(`${API_URL}/account?token=${token}`).then(processApiResponse);
}
