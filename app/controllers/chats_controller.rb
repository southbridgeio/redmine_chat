class ChatsController < ApplicationController
  unloadable


  def index
    @issues = Issue.visible.joins(:chat_messages).uniq
  end

  def show
  end
end
