var chatInit = function() {
  var chatUrl;
  var faye;
  var chatDiv = document.getElementById('chat');
  var chatsDiv = document.getElementById('chats');
  if (chatDiv) {

    var issueId = chatDiv.getAttribute('data-issue-id');
    var currentUserId = chatDiv.getAttribute('data-current-user-id');
    chatUrl = chatDiv.getAttribute('data-chat-url');

    faye = new Faye.Client(chatUrl);
    faye.subscribe("/messages/new", function(data) {
      console.log(data);

      var template;

      if (data['user_id'] == currentUserId) {
        template = Handlebars.compile( $("#message-template").html());
      } else {
        template = Handlebars.compile( $("#message-response-template").html());
      }

      var context = {
        messageText: data['message'],
        time: data['time'],
        name: data['name']

      };

      $('#chat-history-' + issueId + ' ul').append(template(context));

      var element = document.getElementById("chat-history-" + issueId);
      element.scrollTop = $('.chat-history')[0].scrollHeight;


    });

  } else if (chatsDiv) {
    chatUrl = chatsDiv.getAttribute('data-chat-url');

    faye = new Faye.Client(chatUrl);
    faye.subscribe("/messages/new", function(data) {
      console.log(data);

      issueId = data['issue_id'];


      var chatMessagesCounter = $('#chat-' + issueId + ' .new-messages-count');
      var messagesCount = parseInt(chatMessagesCounter.html());

      if (Number.isInteger(messagesCount) ) {
        messagesCount++;
        chatMessagesCounter.html(messagesCount)
      } else {
        chatMessagesCounter.html(1)
      }

    });
  }

  return chatDiv;
};

$(function() {
  var chatDiv = chatInit();
  if (chatDiv) {

    var issueId = chatDiv.getAttribute('data-issue-id');
    $('#chat-button').on('click', function () {

      $('#chat').show();
      var element = document.getElementById("chat-history-" + issueId);
      element.scrollTop = $('.chat-history')[0].scrollHeight;

    });
  }
});

