import React from 'react';

import styles from 'styles/sidebar.css';
class Channel extends React.Component {
    render() {

        return <div className={styles.channel}>{this.props.channel.title}</div>
    }
}

export default class ChannelList extends React.Component {
    render() {
        return (
            <div className={styles.channellist}>
                {Object.keys(this.props.channels).map((id) => {
                    return <Channel key={id} channel={this.props.channels[id]}/>
                })}
            </div>
        )
    }
}
