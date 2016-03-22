import React from 'react';
import {connect} from 'react-redux';

import ChatTop from 'components/chat/ChatTop';
import MessageList from 'components/chat/MessageList';
import MessageComposer from 'components/chat/MessageComposer';

import * as actions from 'actions/actions';
import { minimizeChat } from 'actions/UI';

import styles from 'styles/chat.module.css';

class ChatContainer extends React.Component {
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
                <ChatTop 
                    onMinimize={this.props.minimizeChat}
                    onToggleFilterStarred={this.props.toggleFilterStarred}
                    onSearch={this.props.onSearch}
                    starred={this.props.activeFilter.stared}
                    searchString={this.props.activeFilter.search}
                />
                <div className={styles.channel_title}>{this.props.channelTitle}</div>
                <MessageList 
                    channelLastVisited={this.props.channelLastVisited}
                    channelTitle={this.props.channelTitle}
                    messages={this.props.messages} 
                    onStarMessage={this.props.starMessage}
                    onDeleteMessage={this.props.deleteMessage}
                />
                <MessageComposer sendMessage={this.props.sendMessage}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentChannel: state.chats.currentChannel,
        channelTitle: state.chats.currentChannel ? state.chats.channels[state.chats.currentChannel].title : null,
        channelLastVisited: state.chats.currentChannel ? state.chats.channels[state.chats.currentChannel].last_visited_at : null,
        activeFilter: state.chats.activeFilter,
        messages: state.chats.messages[state.chats.currentChannel] || null
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
                return dispatchProps.fetchMessages(stateProps.currentChannel, stateProps.activeFilter);
        },
        sendMessage: (message) => {
            if (stateProps.currentChannel !== null ) {
                return dispatchProps.sendMessage(stateProps.currentChannel, message);
            }
        },
        deleteMessage: (msgId) => {
            if (stateProps.currentChannel !== null) {
                return dispatchProps.deleteMessage(
                    stateProps.currentChannel,
                    msgId
                )
            }   
        },
        starMessage: (msgId) => {
            if (stateProps.currentChannel !== null) {
                return dispatchProps.updateMessage(
                    stateProps.currentChannel, 
                    msgId,
                    {
                        stared: !stateProps.messages[msgId].stared
                    }
                );
            }
        },
        toggleFilterStarred: () => {
            return dispatchProps.applyFilter({
                stared: !stateProps.activeFilter.stared
            })
        },
        onSearch: (searchString) => {
            return dispatchProps.applyFilter({
                search: searchString
            })
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ChatContainer);
