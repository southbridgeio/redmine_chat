import React from 'react';

import styles from 'styles/sidebar.module.css';

class Channel extends React.Component {
    render() {
        return (
            <div onClick={this.props.onSelect} className={styles.channellist__channel}>
                {(this.props.isActive) ? <div className={styles.channellist__channel__selection}></div> : null }
                {this.props.channel.title}
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
                        key={id} 
                        channel={this.props.channels[id]}
                    />
                })}
            </div>
        )
    }
}
