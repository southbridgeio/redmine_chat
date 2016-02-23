class ChatApi::MessagesController < ChatApi::BaseController
  unloadable

  def index
    @issue = Issue.find(params[:chat_id])
    @messages = @issue.chat_messages.order('created_at desc').limit(20).offset(params[:offset])
  end

  # POST /messages
  def create
    @issue = Issue.find(params[:chat_id])
    @chat_message = @issue.chat_messages.new(message: params[:message])
    @chat_message.chat_user_id = params[:user_id]
    @chat_message.user_name = User.find_by(id: params[:user_id]).try(:name)

    if @chat_message.save
      ChatBroadcastWorker.perform_async @chat_message.id
      render json: @chat_message.as_json
    else
      render json: @chat_message.errors.as_json
    end
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Chat with id #{params[:chat_id]} not found"}, status: 404
  end

  # PATCH/PUT /messages/1
  def update
    @chat_message = ChatMessage.find(params[:id])
    if @chat_message.update(chat_message_params)
      render json: @chat_message.as_json
    else
      render json: @chat_message.errors.as_json
    end
  end

  # DELETE /messages/1
  def destroy
    @chat_message = ChatMessage.find(params[:id])
    @chat_message.destroy
    render json:  {notice: 'Chat message was successfully destroyed.'}
  end

end
