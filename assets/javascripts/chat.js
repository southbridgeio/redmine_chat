var chatInit = function() {
  var chatDiv = document.getElementById('chat');
  if (chatDiv) {

    var issueId = chatDiv.getAttribute('data-issue-id');
    var currentUserId = chatDiv.getAttribute('data-current-user-id');
    var chatUrl = chatDiv.getAttribute('data-chat-url');

    var faye = new Faye.Client(chatUrl);
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

  }

  return chatDiv;
};

$(function() {
  var chatDiv = chatInit();
  var issueId = chatDiv.getAttribute('data-issue-id');
  $('#chat-button').on('click', function () {

    $('#chat').show();
    var element = document.getElementById("chat-history-" + issueId);
    element.scrollTop = $('.chat-history')[0].scrollHeight;

  });
});

