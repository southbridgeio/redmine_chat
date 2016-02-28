import React from 'react';
import {connect} from 'react-redux';

import ChatTop from 'components/chat/ChatTop';

import MessageList from 'components/chat/MessageList';
import MessageComposer from 'components/chat/MessageComposer';

import * as actions from '../actions/actions';
import styles from 'styles/chat.module.css';

class ChatContainer extends React.Component {
    componentWillMount() {
        const { dispatch, user } = this.props;
        dispatch(actions.fetchMessages(1));
    }
    _sendMessage(message) {
        const {dispatch} = this.props;
        dispatch(actions.sendMessage(this.props.currentChannel, message))
    }
    _deleteMessage(msgId) {
        const {dispatch} = this.props;
        dispatch(actions.deleteMessage(this.props.currentChannel, msgId));
    }
    render() {
        if (this.props.currentChannel === null) {
            return <div className={styles.container}>выберите чат</div>
        }
        return (
            <div className={styles.chatcontainer}>
                <div className={styles.chatbox}>
                    <div className={styles.channel_title}>{this.props.channelTitle}</div>
                    <MessageList 
                        channelTitle={this.props.channelTitle}
                        messages={this.props.messages} 
                        onDeleteMessage={::this._deleteMessage}
                    />
                    <MessageComposer sendMessage={::this._sendMessage}/>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        currentChannel: state.account.currentChannel,
        channelTitle: state.account.channels[state.account.currentChannel].title,
        messages: state.chats.messages[state.account.currentChannel] || null
    }
})(ChatContainer);
