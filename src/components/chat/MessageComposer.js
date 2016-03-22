import React from 'react';

import Icon from 'react-fa';
import styles from 'styles/chat.module.css';

export default class MessageComposer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: ''
        }
    }
    handleSubmit(ev) {
        if (ev.which === 13 && !ev.shiftKey) {
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
                <textarea
                    className={styles.composer__textarea}
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
                <div className={styles.composer__buttons}>
                    <div href="#" className={styles.composer__buttons__invite}>
                        <Icon size="2x" name="bell-o"/>&nbsp;Позвать в чат
                    </div>
                    <div onClick={::this.handleSubmit} className={styles.composer__buttons__send}>Отправить</div>
                </div>
            </div>
        );
    }
}
