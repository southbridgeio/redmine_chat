class ChatsController < ApplicationController
  unloadable


  def index
    @issues = Issue.visible.joins(:chat_messages).uniq
  end

  def show
    @issue = Issue.find(params[:id])
    @project = @issue.project
  end
end
