import React from 'react';

import moment from 'moment';

import styles from './message.css';

export default class Message extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.date}>{moment(this.props.message.created_at).format("MMM Do")}</div>
                <div className={styles.time}>{moment(this.props.message.created_at).format("hh:mm")}</div>
                <h4 className={styles.author}>{this.props.message.name}</h4>
                <div className={styles.text}>
                    {this.props.message.message}
                </div>
                <a href="#" onClick={() => this.props.onDeleteMessage(this.props.message.id)}>delete</a>
            </div>
        )
    }
}
