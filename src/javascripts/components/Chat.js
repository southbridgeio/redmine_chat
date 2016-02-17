'use strict';

var React = require('react'),
    MessageList = require("./MessageList"),
    MessageBox = require("./MessageBox");

var Chat = React.createClass({

  render: function() {
    return (

      <section className="Chat">
        <header className="ChatHeader">
          <h1>#104708 Название тикета. Новый плагин: redmine_chat</h1>
          <div className="ChatLabel">Архив</div>
        </header>
        <MessageList />
        <MessageBox />
      </section>
    );
  }
});


module.exports = Chat;
