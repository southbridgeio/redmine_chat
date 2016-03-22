import React from 'react';

import Message from 'components/chat/Message';

import styles from 'styles/chat.module.css';

export default class MessageList extends React.Component {
    componentDidMount() {
        this._scrollToLastMessage();
    }
    componentDidUpdate() {
        if (this._loadingMore) {
            const messageList = this.refs.messageList;
            if (this._prevScrollHeight !== messageList.scrollHeight) {
                messageList.scrollTop = messageList.scrollHeight - this._prevScrollHeight;
                this.unlockScroll();
            }
            this._loadingMore = false;
        } else {
            this._scrollToLastMessage();
        }
    }
    lockScroll() {
        this._scrollLocked = true;
    }
    unlockScroll() {
        this._scrollLocked = false;
    }
    _scrollToLastMessage() {
        const messageList = this.refs.messageList;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }
    _onScroll(ev) {
        if (this.props.isLoading && this._scrollLocked) return ev.preventDefault();
        const messageList = this.refs.messageList;
        if (messageList) {
            if ((messageList.scrollTop < 100) && this.props.hasMessagesToLoad) {
                this.lockScroll();
                this._loadingMore = true;
                this._prevScrollHeight = messageList.scrollHeight;
                this.props.loadMore(); 
            }
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
            <div className={styles.messagelist} ref='messageList' onScroll={::this._onScroll}>
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
