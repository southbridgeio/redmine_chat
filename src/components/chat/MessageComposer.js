import React from 'react';

import styles from 'styles/chat.css';

export default class MessageComposer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: ''
        }
    }
    handleSubmit(ev) {
        if (ev.which === 13) {
            ev.preventDefault();

            if (this.state.text.length > 0) {
                const {sendMessage} = this.props;
                sendMessage(this.state.text);
                this.setState({
                    text: ''
                });
            }
        }

    }
    handleChange(ev) {
        this.setState({ text: ev.target.value });
    }
    render() {
        return (
            <div className={styles.composer}>
                <input
                    className={styles.composer}
                    type="textarea"
                    name="message"
                    rows={3}
                    value={this.state.text}
                    ref="messageComposer"
                    autoFocus="true"
                    placeholder="Введите сообщение"
                    onChange={::this.handleChange}
                    onKeyDown={::this.handleSubmit}
                />
                <a href="#">Отправить</a>
            </div>
        );
    }
}
