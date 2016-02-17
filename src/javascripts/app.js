var React = window.React = require('react'),
  ReactDOM = require("react-dom"),
  Chat = require("./components/Chat");


var ChatApp = React.createClass({
  getInitialState: function () {
    return {
      chatId: 8
    };
  },
  render: function () {
    return (
      <div className="ChatContainer">
        <header className="NavHeader"></header>
        <div className="ChatWrapper">
          <aside>
            <ul className="UserList">
              <li className="UserListItem">
                <div className="UserPhoto"></div>
                <div className="UserName"></div>

              </li>
            </ul>
            <ul className="ChatList">

            </ul>
          </aside>
          <Chat chatUrl={this.props.redmineUrl + 'chats/' + this.state.chatId}/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<ChatApp />, document.getElementById("ChatApp"));
