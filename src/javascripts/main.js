
var React = require('react');
//var ListContainer = require('./components/ListContainer');

var ChatApp = React.createClass({
  render: function(){
    return (
      <div className="chatContainer">
        <div className="row">
        </div>
      </div>
    )
  }
});

React.render(
  <ChatApp />,
  document.getElementById('ChatApp')
);
