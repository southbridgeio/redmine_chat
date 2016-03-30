import React from 'react';
import Icon from 'react-fa';

import { MESSAGES_ON_PAGE } from 'settings';

import styles from 'styles/sidebar.module.css';

class UnreadCount extends React.Component {
    render() {
        if (this.props.count === 0) return null
        return (
            <span className={styles.channellist__channel__unread}>{this.props.count >= MESSAGES_ON_PAGE ? '20+' : this.props.count}</span>
        )
    }
}

class Channel extends React.Component {
    render() {
        return (
            <div className={styles.channellist__channel}>
                <div onClick={this.props.onSelect} className={styles.channellist__channel__title}>
                    {(this.props.isActive) ? <div className={styles.channellist__channel__selection}></div> : null }
                    <span onClick={this.props.onSelect}>{this.props.channel.title}</span>
                    
                    <UnreadCount count={this.props.channel.unreadCount}/>
                </div>
                <div className={styles.channellist__channel__leave}>
                    <Icon className={styles.channellist__channel__leave__icon} onClick={this.props.onLeave}name="power-off"/>
                </div>
            </div>
        )
    }
}

export default class ChannelList extends React.Component {
    render() {
        return (
            <div className={styles.channellist}>
                {Object.keys(this.props.channels).map((id) => {
                    return <Channel 
                        isActive={this.props.activeChannel == id}
                        onSelect={() => this.props.onSelectChannel(id)} 
                        onLeave={() => this.props.onLeaveChannel(id)}
                        key={id} 
                        channel={this.props.channels[id]}
                    />
                })}
            </div>
        )
    }
}
