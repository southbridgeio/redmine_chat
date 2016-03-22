import React from 'react';
import Icon from 'react-fa'

import styles from 'styles/sidebar.module.css';

export default class SidebarTop extends React.Component {
    render() {
        return (
            <div className={styles.sidebar__top}>
                    <Icon className={styles.sidebar__top__button} name="power-off" size="2x"/>
                    &nbsp;
                    <Icon 
                        className={styles.sidebar__top__button} 
                        name={this.props.notificationsEnabled ? "volume-up" : "volume-off"}
                        onClick={this.props.onToggleNotifications}
                        size="2x"
                    />
            </div>
        )
    }
}
