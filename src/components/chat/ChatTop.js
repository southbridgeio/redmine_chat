import React from 'react';
import Icon from 'react-fa';

import styles from 'styles/chat.module.css';

class StarredFilter extends React.Component {
    render() {
        return (
            <Icon 
                onClick={this.props.onClick}
                className={styles.chat__topbar__starred}
                name={this.props.starred ? "star" : "star-o"}
            />
        )
    }
}

export default class ChatTop extends React.Component {
    _onKeyDown(ev) {
        let input = this.refs.search;
        if (ev.keyCode === 13) {
            ev.preventDefault();
            if (input !== null) {
                this.props.onSearch(input.value);
            }
        } else if (ev.keyCode === 27) {
            ev.preventDefault();
            input.value = "";
            this.props.onSearch(null);
        }
    }
    render() {
        return (
            <div className={styles.chat__topbar}>
                <Icon className={styles.chat__topbar__link} name="link"/>
                <StarredFilter starred={this.props.starred} onClick={this.props.onToggleFilterStarred}/>
                <input 
                    className={styles.chat__topbar__search} 
                    placeholder="Поиск"
                    ref="search"
                    initialValue={this.props.searchString || ""}
                    onKeyDown={::this._onKeyDown}
                />
                <Icon onClick={this.props.onMinimize} className={styles.chat__topbar__close} name="times"/>
            </div>
        )
    }
}
