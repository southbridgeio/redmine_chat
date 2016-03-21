import React from 'react';
import Icon from 'react-fa';

import moment from 'moment';
moment.locale('ru');

import styles from 'styles/message.module.css';

class Buttons extends React.Component {
    render() {
        return (
            <div className={styles.header__buttons}>
                <a href="#" className={styles.header__buttons__button} onClick={this.props.onStarMessage}>
                    <Icon size="lg" name={this.props.stared ? "star" : "star-o"}/>
                </a>
                <a href="#" className={styles.header__buttons__button} onClick={this.props.onDeleteMessage}>
                    <Icon size="lg" name="times"/>
                </a>
                <a href="#" className={styles.header__buttons__button} onClick={()=>{}}>
                    <Icon size="lg" name="ellipsis-v"/>
                </a>
            </div>
        )
    }
}
export default class Message extends React.Component {
    _isUnread() {
        return new Date(this.props.message.created_at).getTime() > this.props.channelLastVisited;
    }
    _createMarkup(text) {
        return { __html: text.replace(/\n/g, '<br>') }
    }
    render() {
        return (
            <div className={styles.message}>
                <div className={styles.header}>
                    <Buttons 
                        onStarMessage={() => this.props.onStarMessage(this.props.message.id)} 
                        onDeleteMessage={() => this.props.onDeleteMessage(this.props.message.id)}
                        stared={this.props.message.stared}
                    />
                    <div className={styles.header__date}>{moment(this.props.message.created_at).format("DD MMM")}</div>
                    <div className={this._isUnread() ? styles.header__time_unread : styles.header__time}>{moment(this.props.message.created_at).format("hh:mm")}</div>
                    <div className={this._isUnread() ? styles.header__author_unread : styles.header__author}>{this.props.message.name}</div>
                </div>
                <div className={styles.text} dangerouslySetInnerHTML={this._createMarkup(this.props.message.message)}/>
            </div>
        )
    }
}
