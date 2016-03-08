import React from 'react';
import Icon from 'react-fa'

import styles from 'styles/sidebar.module.css';

export default class SidebarTop extends React.Component {
    render() {
        return (
            <div className={styles.sidebar__top}>
                    <Icon name="power-off" size="2x"/>
                    &nbsp;
                    <Icon name="volume-off" size="2x"/>
            </div>
        )
    }
}
