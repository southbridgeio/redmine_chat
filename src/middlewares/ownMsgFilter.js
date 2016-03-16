// if there's any outstanding POST requests delay save RECEIVE_MESSAGE actions.
// When POST request finishes save id of created message
// When all requests were finished filter saved actions so we don't dispatch RECEIVE_MESSAGE for our own messages 


import * as types from 'actionTypes';

var outstandingRequests = 0,
    outstandingActions = [],
    ownMessageIds = [];

export const ownMessageFilter =  store => next => action => {
    switch (action.type) {
        case types.SEND_MESSAGE:
            outstandingRequests++;
        break;
        case types.SEND_MESSAGE_SUCCESS:
            outstandingRequests--;
            ownMessageIds.push(action.data.id);
        break;
        case types.SEND_MESSAGE_FAIL:
            outstandingRequests--;
        break;
        case types.RECEIVE_MESSAGE:
            outstandingActions.push(action);
            if (outstandingRequests === 0) {
                outstandingActions.forEach((delayedAction) => {
                    if (ownMessageIds.indexOf(delayedAction.data.id) === -1) {
                        // its not our own message, dispatch the action
                        next(delayedAction);
                    } 
                });      
                outstandingActions.length = 0;
                ownMessageIds.length = 0;
                return;
            }
        break;
    }
    return next(action);
};
