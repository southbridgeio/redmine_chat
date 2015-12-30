class ChatMessagesController < ApplicationController
  unloadable

  include Tubesock::Hijack

  def listener
    channel_name = "issue-#{params[:issue_id]}.chat_message"

    hijack do |websocket|
      receiver = CHAT_MESSENGER.subscribe(channel_name)
      websocket.onopen do
        receiver.on_message { |message| websocket.send_data(message) }
      end

      websocket.onclose { CHAT_MESSENGER.unsubscribe(receiver) }
    end
  end

  # POST /chat_messages
  def create
    @chat_message = ChatMessage.new(chat_message_params)

    if @chat_message.save
      CHAT_REDIS.publish("issue-#{@chat_message.issue_id}.chat_message", @chat_message.to_json)
      respond_to do |format|
        format.html { redirect_to @chat_message.issue, notice: 'Chat message was successfully created.' }
        format.js
      end
    end
  end

  # PATCH/PUT /chat_messages/1
  def update
    if @chat_message.update(chat_message_params)
      redirect_to @chat_message, notice: 'Chat message was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /chat_messages/1
  def destroy
    @chat_message.destroy
    redirect_to chat_messages_url, notice: 'Chat message was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat_message
      @chat_message = ChatMessage.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def chat_message_params
      params.require(:chat_message).permit(:issue_id, :user_id, :message)
    end
end
