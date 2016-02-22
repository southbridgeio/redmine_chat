class ChatApi::ChatsController < ChatApi::BaseController
  unloadable
  respond_to :json

  def index
    @issues = Issue.visible.joins(:chat_messages).uniq
  end

  def show
    @issue = Issue.find(params[:id])
    respond_with @issue
  end
end
