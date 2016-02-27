module RedmineChat

  module IssuesControllerPatch
    def self.included(base) # :nodoc:
      base.class_eval do
        unloadable

        before_action :set_chat_token, only: [:show]

        private

        def set_chat_token
          unless cookies[:chat_token].present?
            cookies[:chat_token] = { value:   Base64.encode64("#{User.current.id}:#{Time.now.to_i}:#{User.current.salt}"),
                                     expires: 3.days.from_now }
          end
        end

      end
    end

  end
end
IssuesController.send(:include, RedmineChat::IssuesControllerPatch)
