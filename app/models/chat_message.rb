class ChatMessage < ActiveRecord::Base
  unloadable

  include Redmine::I18n

  belongs_to :issue
  belongs_to :user

  def as_json(options = {})
    {
      id: id,
      issue_id: issue_id,
      created_at: format_time(created_at),
      user: user.name,
      message: message
    }
  end

end
