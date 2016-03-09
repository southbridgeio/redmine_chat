module ChatApi
  class BaseController < ApplicationController
    before_filter :authorize

    private

    def authorize
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
    end
  end
end
