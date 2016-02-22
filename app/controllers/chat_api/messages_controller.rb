class ChatApi::MessagesController < ChatApi::BaseController
  unloadable
  respond_to :json

  def index
    @issue = Issue.find(params[:chat_id])
    @messages = @issue.chat_messages.page(params[:page])
    respond_with @messages
  end

  # POST /chat_messages
  def create
    @chat_message = ChatMessage.new(chat_message_params)

    if @chat_message.save
      ChatBroadcastWorker.perform_async @chat_message.id
      render json: @chat_message.as_json
    else
      render json: @chat_message.errors.as_json
    end
  end

  # PATCH/PUT /chat_messages/1
  def update
    if @chat_message.update(chat_message_params)
      render json: @chat_message.as_json
    else
      render json: @chat_message.errors.as_json
    end
  end

  # DELETE /chat_messages/1
  def destroy
    @chat_message.destroy
    render json:  {notice: 'Chat message was successfully destroyed.'}
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
