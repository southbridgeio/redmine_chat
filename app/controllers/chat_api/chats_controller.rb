class ChatApi::ChatsController < ChatApi::BaseController
  unloadable

  def index
    @issues = Issue.visible.joins(:chat_messages).uniq
  end

  def show
    @issue = Issue.find(params[:id])
    @chat = Chat.new(@issue.id)
  end

  def join
    @issue = Issue.find(params[:id])

    @chat = Chat.new(@issue.id)
    @chat_user.name = @user.name
    @chat_user.email = @user.mail

    @chat.user_join @chat_user.id
    @chat_user.join_to_chat @chat.id

    ChatBroadcastWorker.perform_async "chat/#{@issue.id}", 'user_join', render_to_string('chat_api/users/public')

    channel = "chat/#{@issue.id}"
    message_type = 'user_join'
    json_data = render_to_string('chat_api/users/public')
    CHAT_REDIS.publish(channel, { type:    message_type,
                                  payload: json_data })

    render 'chat_api/users/public'
  end

  def guest_join
    @issue = Issue.find(params[:id])
    @chat = Chat.new(@issue.id)

    @chat_user.name = params[:name]

    @chat.user_join @chat_user.id
    @chat_user.join_to_chat @chat.id

    ChatBroadcastWorker.perform_async "chat/#{@issue.id}", 'user_join', render_to_string('chat_api/users/public')

    render 'chat_api/users/public'
  end

  def invite
    @issue = Issue.find(params[:id])
    @chat = Chat.new(@issue.id)
    if @chat_user.id.to_s.include?('guest')
      @notes = "Пользователь #{@chat_user.name.value} приглашает в чат."
      @issue.journals.create(user_id: User.anonymous.id, notes: @notes)
    else
      @notes = 'Приглашаю войти в чат.'
      @issue.journals.create(user_id: @chat_user.id, notes: @notes)
    end
  end

  def exit
    @issue = Issue.find(params[:id])
    @chat = Chat.new(@issue.id)

    @chat.user_ids.delete @chat_user.id
    @chat_user.chat_ids.delete @chat.id

    ChatBroadcastWorker.perform_async "chat/#{@issue.id}", 'user_exit', render_to_string('chat_api/chats/show')
  end
end
