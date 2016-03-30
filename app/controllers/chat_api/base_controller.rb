module ChatApi
  class BaseController < ActionController::Base
    before_filter :authorize

    private

    def authorize
      # binding.pry
      if session[:user_id]
        # user is authenticated
        @chat_user = ChatUser.new(session[:user_id])
        set_user_name(@chat_user.id) unless @chat_user.name.value.present?
      else
        if request.headers['HTTP_AUTHORIZATION'].present?
          token                   = request.headers['HTTP_AUTHORIZATION'].match(/Bearer (.+)/)[1]
          user_id, time_int, salt = Base64.decode64(token).split(':')
          if salt == 'g'
            @chat_user = ChatUser.new(user_id)
            set_user_name(@chat_user.id) unless @chat_user.name.value.present?
          else
            @user = User.find(user_id)
            if @user.salt == salt
              @chat_user = ChatUser.new(user_id)
              set_user_name(@chat_user.id) unless @chat_user.name.value.present?
            else
              render json: { error: 'wrong token' }, status: :unauthorized
            end
          end
        else
          render json: { error: 'empty token' }, status: :unauthorized
        end

      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'wrong token' }, status: :unauthorized
      # puts @chat_user.as_json
    end

    def set_user_name(user_id)
      @user            = User.find(user_id)
      @chat_user       = ChatUser.new(user_id)
      @chat_user.name  = @user.name
      @chat_user.email = @user.mail
    end
  end
end
