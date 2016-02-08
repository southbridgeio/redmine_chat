'use strict';

var React = require('react');

var Message = React.createClass({

  render: function() {
    return (
      <div className="Message">
        <header className="MessageHeader">
          <div className="UserName">{this.props.name}</div>
          <time>{this.props.time}</time>
        </header>
        <section className="MessageBody">
          {this.props.message}
        </section>
      </div>
    );
  }
});


module.exports = Message;
