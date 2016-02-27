class ChatApi::MessagesController < ChatApi::BaseController
  unloadable

  def index
    @issue          = Issue.find(params[:chat_id])
    messages        = @issue.chat_messages.order('created_at desc')
    messages        = messages.where(stared: true)                             if params[:stared].present?
    messages        = messages.where('message LIKE ?', "%#{params[:search]}%") if params[:search].present?
    @total_messages = messages.count
    @messages       = messages.limit(20).offset(params[:offset])
  end

  # POST /messages
  def create
    @issue                = Issue.find(params[:chat_id])
    @message              = @issue.chat_messages.new(message: params[:message])
    @message.chat_user_id = @chat_user.id
    @message.user_name    = @chat_user.try(:name).try(:value)

    if @message.save
      ChatBroadcastWorker.perform_async "chat/#{@issue.id}", 'message_new', @message.as_json
      render json: @message.as_json
    else
      render json: @message.errors.as_json, status: :forbidden
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Chat with id #{params[:chat_id]} not found" }, status: :not_found
  end

  # DELETE chat/:chat_id/messages/:id
  def destroy
    @message = ChatMessage.find(params[:id])
    if @message.chat_user_id == @chat_user.id.to_s
      ChatBroadcastWorker.perform_async "chat/#{@issue.id}", 'message_delete', @message.as_json
      @message.destroy
      render json: { notice: 'Chat message was successfully destroyed.' }
    else
      render json: { error: "Can't to destroy message from other user." }
    end
  end

end
