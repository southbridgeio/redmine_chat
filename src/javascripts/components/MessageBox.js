import React from 'react';
import trim from 'trim';


class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    // this.firebaseRef = new Firebase('https://example-chat-17.firebaseio.com/messages');
  }

  onChange(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  onKeyUp(evt) {
    if (evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();

      // this.firebaseRef.push({
      //   message: this.state.message
      // });

      this.setState({
        message: ''
      });

      console.log('Sent a new message: ', evt.target.value);
    }
  }

  render() {
    return (
      <div className="MessageBox">
        <textarea
          value={this.state.message}
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        />
        <footer className="MessageBoxFooter">
          <div className="callToChatLink">
            <img src="/plugin_assets/redmine_chat/images/bell.png" />
            <div>Позвать в чат</div>
          </div>
          <div className="sendButton">
            Отправить
          </div>
        </footer>
      </div>
    );
  }
}

export default MessageBox;
