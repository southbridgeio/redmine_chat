'use strict';

var React = require('react'),
    Messages = require("./Messages");

var Chat = React.createClass({

  render: function() {
    return (

      <section className="Chat">
        <header className="ChatHeader">
          <h1>#104708 Название тикета. Новый плагин: redmine_chat</h1>
          <div className="ChatLabel">Архив</div>
        </header>
        <Messages />
      </section>
    );
  }
});


module.exports = Chat;
