class ChatApi::UsersController < ChatApi::BaseController
  def show

  end

  def mute
    @chat_user.sounds_on = false
    render :show
  end

  def unmute
    @chat_user.sounds_on = true
    render :show
  end

  def update_last_visited
    @chat_user.chat_ids[params[:chat_id]] = Time.now.to_i if params[:chat_id].present?
    render :show
  end

  include Tubesock::Hijack

  def events
    channel_name = "user/#{@chat_user.id}"

    hijack do |websocket|
      receiver = CHAT_MESSENGER.subscribe(channel_name)
      websocket.onopen do
        puts "SOCKET: #{channel_name} open"
        receiver.on_message do |message|
          puts "Events: #{message}"
          websocket.send_data(message)
        end
      end

      websocket.onclose { CHAT_MESSENGER.unsubscribe(receiver) }
    end
  end
end
