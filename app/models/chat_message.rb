# t.integer  "issue_id",     limit: 4
# t.integer  "user_id",      limit: 4
# t.text     "message",      limit: 65535
# t.datetime "created_at",                                 null: false
# t.datetime "updated_at",                                 null: false
# t.string   "user_name",    limit: 255
# t.string   "chat_user_id", limit: 255
# t.boolean  "stared",                     default: false, null: false

class ChatMessage < ActiveRecord::Base
  unloadable

  belongs_to :issue
  belongs_to :user

  validates_presence_of :message, :user_name, :chat_user_id

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
