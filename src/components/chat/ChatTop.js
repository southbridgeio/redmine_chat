import React from 'react';
import Icon from 'react-fa';
import CopyToClipboard from 'react-copy-to-clipboard';

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
    constructor(props) {
        super(props);
        this.state = {
            share_link: false
        }
    }
    _toggleShareLink() {
        this.setState({
            share_link: !this.state.share_link
        })
    }
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
        if (this.state.share_link) {
            return (
                <div className={styles.chat__topbar_share}>
                    <Icon className={styles.chat__topbar__link} name="link"/>
                    <div className={styles.chat__topbar__link_container}>
                        <input 
                            className={styles.chat__topbar__link_input}
                            placeholder="Ссылка"
                            ref="link"
                            value={this.props.sharedLink}
                        />
                    </div>
                    <div className={styles.chat__topbar__buttons}>
                        <CopyToClipboard 
                            text={this.props.sharedLink}
                            onCopy={::this._toggleShareLink}
                        >
                            <div className={styles.chat__topbar__button}>Скопировать</div>
                        </CopyToClipboard>
                        &nbsp;
                        <div onClick={::this._toggleShareLink} className={styles.chat__topbar__button}>Закрыть</div>
                    </div>
                </div>
            )
        } else return (
            <div className={styles.chat__topbar}>
                <Icon onClick={::this._toggleShareLink} className={styles.chat__topbar__link} name="link"/>
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
