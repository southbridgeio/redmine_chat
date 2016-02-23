class ChatMessage < ActiveRecord::Base
  unloadable

  include Redmine::I18n

  belongs_to :issue
  belongs_to :user

  def as_json(options = {})
    {
      id: id,
      chat_id: issue_id,
      created_at: created_at,
      user: user_name,
      message: message
    }
  end

end
