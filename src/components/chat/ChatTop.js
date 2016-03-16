import React from 'react';
import Icon from 'react-fa';

import styles from 'styles/chat.module.css';

export default class ChatTop extends React.Component {
    render() {
        return (
            <div className={styles.chat__topbar}>
                <Icon onClick={this.props.onMinimize} className={styles.chat__topbar__close} name="times"/>
            </div>
        )
    }
}
