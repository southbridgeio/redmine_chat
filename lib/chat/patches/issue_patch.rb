module Chat
  module IssuePatch
    def self.included(base) # :nodoc:
      base.class_eval do
        unloadable

        has_many :chat_messages

      end
    end

  end
end
Issue.send(:include, Chat::IssuePatch)
