import React from 'react';

import Message from 'components/chat/Message';

import styles from 'styles/chat.css';

export default class MessageList extends React.Component {
    render() {
        if (!this.props.messages.length) return <div>no messages</div>;
        return (
            <div>
                <h2 className={styles.title}>{this.props.channelTitle}</h2>
                {this.props.messages.map((msg) => <Message onDeleteMessage={this.props.onDeleteMessage}message={msg} key={msg.id}/>)}
            </div>
        )
    }
}
