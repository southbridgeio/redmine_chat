import React from 'react';
import {connect} from 'react-redux';

import ChatTop from 'components/chat/ChatTop';
import MessageList from 'components/chat/MessageList';
import MessageComposer from 'components/chat/MessageComposer';

import * as actions from 'actions/actions';
import { minimizeChat } from 'actions/UI';

import styles from 'styles/chat.module.css';

class ChatContainer extends React.Component {
    componentWillMount() {
        this.props.fetchMessages();
    }
    _deleteMessage(msgId) {
        const {dispatch} = this.props;
        dispatch(actions.deleteMessage(this.props.currentChannel, msgId));
    }
    render() {
        if (this.props.currentChannel === null) {
            return (
                <div className={styles.chatcontainer}>
                    <ChatTop onMinimize={this.props.minimizeChat}/>
                    выберите чат
                </div>
            )
        }
        return (
            <div className={styles.chatcontainer}>
                <ChatTop onMinimize={this.props.minimizeChat}/>
                <div className={styles.channel_title}>{this.props.channelTitle}</div>
                <MessageList 
                    channelLastVisited={this.props.channelLastVisited}
                    channelTitle={this.props.channelTitle}
                    messages={this.props.messages} 
                    onDeleteMessage={::this._deleteMessage}
                />
                <MessageComposer sendMessage={this.props.sendMessage}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentChannel: state.account.currentChannel,
        channelTitle: state.account.currentChannel ? state.chats.channels[state.account.currentChannel].title : null,
        channelLastVisited: state.account.currentChannel ? new Date(state.chats.channels[state.account.currentChannel].last_visited_at).getTime() : null,
        messages: state.chats.messages[state.account.currentChannel] || null
    }
}

const mapDispatchToProps = {
    ...actions,
    minimizeChat
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, {
        fetchMessages: () => {
            if (stateProps.currentChannel !== null)
                return dispatchProps.fetchMessages(stateProps.currentChannel);
        },
        sendMessage: (message) => {
            if (stateProps.currentChannel !== null ) {
                return dispatchProps.sendMessage(stateProps.currentChannel, message);
            }
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChatContainer);
