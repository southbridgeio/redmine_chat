import React from 'react';
import Icon from 'react-fa';

import styles from 'styles/chat.module.css';

class StarredFilter extends React.Component {
    render() {
        return (
            <Icon className={styles.chat__topbar__starred} name={this.props.starred ? "star" : "star-o"}/>
        )
    }
}

export default class ChatTop extends React.Component {
    render() {
        return (
            <div className={styles.chat__topbar}>
                <Icon className={styles.chat__topbar__link} name="link"/>
                <StarredFilter starred={this.props.starred} onClick={this.props.onStarredToggle}/>
                <Icon onClick={this.props.onMinimize} className={styles.chat__topbar__close} name="times"/>
            </div>
        )
    }
}
