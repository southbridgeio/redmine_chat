class ChatsController < ApplicationController
  unloadable
  skip_before_filter :session_expiration, :check_if_login_required, :check_password_change, :set_localization

  layout 'guest_chat'

  def show
    @issue = Issue.find(params[:id])
    # binding.pry
    if User.current.anonymous?
      if @issue.chat_shared_key == params[:token]
        cookies.permanent[:guest_id] = "g-#{SecureRandom.hex(3)}" if cookies[:guest_id].nil?
        @chat_user                   = ChatUser.new(cookies[:guest_id])
        @chat_user.name              = params[:name] if params[:name].present?
        cookies[:chat_token]         = {
            value:   Base64.encode64("#{cookies[:guest_id]}:#{Time.now.to_i}:g"),
            expires: 1.day.from_now
        }
      else
        render status: :unauthorized, text: 'Unauthorized'
      end
    else
      unless Issue.visible.include? @issue
        render status: :unauthorized, text: 'Unauthorized'
      end
      cookies[:chat_token] = { value:   Base64.encode64("#{User.current.id}:#{Time.now.to_i}:#{User.current.salt}"),
                               expires: 1.day.from_now }
    end

    @chat_token = cookies[:chat_token].chomp
    @maximized  = true
    # puts "chat_token: #{cookies[:chat_token]}"

  end


end
