import React from 'react';

import Message from 'components/chat/Message';

import styles from 'styles/chat.module.css';

export default class MessageList extends React.Component {
    componentDidMount() {
        this._scrollToLastMessage();
    }
    componentDidUpdate() {
        this._scrollToLastMessage();
    }
    _scrollToLastMessage() {
        const messageList = this.refs.messageList;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }
    render() {
        if (!this.props.messages || !Object.keys(this.props.messages).length) return (
            <div className={styles.messagelist}>
                <div className={styles.messagelist__empty}>
                    Нет сообщений
                </div>
            </div>
        );
        return (
            <div className={styles.messagelist} ref='messageList'>
                <div>
                    {Object.keys(this.props.messages).map((msgId) => <Message 
                        channelLastVisited={this.props.channelLastVisited} 
                        onDeleteMessage={this.props.onDeleteMessage}
                        onStarMessage={this.props.onStarMessage}
                        message={this.props.messages[msgId]} 
                        key={msgId}
                    />)}
                </div>
            </div>
        )
    }
}
