import React from 'react';
import {connect} from 'react-redux';
import MessageList from 'components/chat/MessageList';
import MessageComposer from 'components/chat/MessageComposer';

import styles from 'styles/chat.css';

import * as actions from '../actions/actions';

class TopBar extends React.Component {
    render() {
        return (
            <div>top</div>
        )
    }
}
class ChatContainer extends React.Component {
    componentWillMount() {
        const { dispatch, user } = this.props;
        dispatch(actions.fetchMessages(1));
    }
    _sendMessage(message) {
        const {dispatch} = this.props;
        dispatch(actions.sendMessage(1, message))
    }
    _deleteMessage(msgId) {
        console.log(msgId);
        const {dispatch} = this.props;
        dispatch(actions.deleteMessage(1, msgId));
    }
    render() {
        return (
            <div className={styles.container}>
                <TopBar className={styles.topbar}/>
                <MessageList 
                    channelTitle={this.props.channelTitle}
                    messages={this.props.messages} 
                    onDeleteMessage={::this._deleteMessage}
                />
                <MessageComposer sendMessage={::this._sendMessage}/>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        channelTitle: state.account.channels[state.account.currentChannel].title,
        messages: state.messages.data
    }
})(ChatContainer);
