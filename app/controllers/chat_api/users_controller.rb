class ChatApi::UsersController < ChatApi::BaseController
  def show
    @chat_user = ChatUser.new(params[:id])

  end

  def mute

  end

  def unmute

  end
end
