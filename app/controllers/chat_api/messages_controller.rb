class ChatApi::MessagesController < ChatApi::BaseController
  unloadable

  def index
    @issue    = Issue.find(params[:chat_id])
    @messages = @issue.chat_messages.order('created_at desc').limit(20).offset(params[:offset])
  end

  # POST /messages
  def create
    @issue                = Issue.find(params[:chat_id])
    @message              = @issue.chat_messages.new(message: params[:message])
    @message.chat_user_id = params[:user_id]
    if params[:user_id].present?
      @message.user_name = ChatUser.new(params[:user_id]).try(:name).try(:value)
    end

    if @message.save
      ChatBroadcastWorker.perform_async @message.id
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
    if @message.chat_user_id == params[:user_id].to_s
      @message.destroy
      render json: { notice: 'Chat message was successfully destroyed.' }
    else
      render json: { error: "Can't to destroy message from other user." }
    end
  end

end
