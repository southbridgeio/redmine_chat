module ChatApi
  class BaseController < ActionController::Base
    before_filter :authorize

    private

    def authorize
      # binding.pry
      if session[:user_id]
        # user is authenticated
        @chat_user = ChatUser.new(session[:user_id])
      else
        if params[:token].present?
          user_id, time_int, salt = Base64.decode64(params[:token]).split(':')
          if salt == 'guest'
            @chat_user = ChatUser.new(user_id)
          else
            @user = User.find(user_id)
            if @user.salt == salt
              @chat_user = ChatUser.new(user_id)
            else
              render json: { error: 'wrong token' }, status: :unauthorized
            end
          end
        else
          render json: { error: 'empty token' }, status: :unauthorized
        end
      end
      set_user_name(@chat_user.id) unless @chat_user.name.value.present?
      # puts @chat_user.as_json
    end

    def set_user_name(user_id)
      @user = User.find(user_id)
      @chat_user = ChatUser.new(user_id)
      @chat_user.name = @user.name
      @chat_user.email = @user.mail
    end
  end
end
