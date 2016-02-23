class ChatsController < ApplicationController
  unloadable
  skip_before_filter :session_expiration, :check_if_login_required, :check_password_change, :set_localization

  layout 'guest_chat'

  def show
    @issue = Issue.find(params[:id])

    if User.current.anonymous?
      if @issue.chat_shared_key == params[:token]
        cookies.permanent[:guest_id] = "guest-#{SecureRandom.hex}" if cookies[:guest_id].nil?
      else
        render status: :unauthorized, text: 'Unauthorized'
      end
    else
      unless Issue.visible.include? @issue
        render status: :unauthorized, text: 'Unauthorized'
      end
    end
  end
end
