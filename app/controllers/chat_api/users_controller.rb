class ChatApi::UsersController < ChatApi::BaseController
  def show
    @chat_user = ChatUser.new(params[:id])

  end

  def mute
    @chat_user = ChatUser.new(params[:id])
    @chat_user.sounds_on = false
    render :show
  end

  def unmute
    @chat_user = ChatUser.new(params[:id])
    @chat_user.sounds_on = true
    render :show

  end

  def update_last_visited
    @chat_user = ChatUser.new(params[:id])
    @chat_user.chat_ids[params[:chat_id]] = Time.now.to_i if params[:chat_id].present?
    render :show
  end
end
