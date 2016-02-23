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
    @user = User.find(params[:user_id])

    @chat = Chat.new(@issue.id)
    @chat_user = ChatUser.new(@user.id)
    @chat_user.name = @user.name
    @chat_user.email = @user.mail

    @chat.user_join @chat_user.id
    @chat_user.join_to_chat @chat.id
    render :show
  end
end
