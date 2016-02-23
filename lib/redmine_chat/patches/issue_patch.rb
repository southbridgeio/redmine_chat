module RedmineChat
  module IssuePatch
    def self.included(base) # :nodoc:
      base.class_eval do
        unloadable

        has_many :chat_messages
        has_many :chat_users, -> { uniq }, through: :chat_messages, source: :user

        def chat_shared_key
          Digest::MD5.hexdigest(FAYE_TOKEN + id.to_s)

        end

      end
    end

  end
end
Issue.send(:include, RedmineChat::IssuePatch)
