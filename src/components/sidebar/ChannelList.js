import React from 'react';

import styles from 'styles/sidebar.module.css';

class Channel extends React.Component {
    render() {
        return (
            <div className={styles.channellist__channel}>
                {(this.props.isActive) ? <div className={styles.channellist__channel__selection}></div> : null }
                <span onClick={this.props.onSelect}>{this.props.channel.title}</span>
                <span onClick={this.props.onLeave}>X</span>
            </div>
        )
    }
}

export default class ChannelList extends React.Component {
    render() {
        console.log(this.props.channels);
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
