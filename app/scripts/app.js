var React = window.React = require('react'),
  ReactDOM = require("react-dom"),
  Timer = require("./ui/Timer"),
  mountNode = document.getElementById("ChatApp");

var TodoList = React.createClass({
  render: function () {
    var createItem = function (itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function () {
    return {items: [], text: ''};
  },
  onChange: function (e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function () {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text}/>
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <Timer />
      </div>
    );
  }
});

var ChatApp = React.createClass({

  render: function () {
    return (
      <div className="ChatContainer">
        <header></header>
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

          <section className="Chat">
            <header>
              <h1>#104708 Название тикета. Новый плагин: redmine_chat</h1>
              <div className="ChatLabel">Архив</div>
            </header>
            <section className="Messages">
              <div className="MessagesDate">5 ФЕВ</div>
              <div className="Message">
                <header>
                  <div className="UserName">Игорь Олемской</div>
                  <time>16:10</time>
                </header>
                <section className="MessageBody">
                  Баинг и селлинг, отбрасывая подробности, программирует потребительский жизненный цикл продукции.
                  Инвестиционный продукт, как принято считать, программирует креативный BTL. По сути, рекламоноситель
                  ускоряет пак-шот, не считаясь с затратами. Структура рынка тормозит из ряда вон выходящий фирменный
                  стиль.
                </section>
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
});


ReactDOM.render(<ChatApp />, mountNode);

