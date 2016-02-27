class ChatUser
  include Redis::Objects
  value :name
  value :email
  value :sounds_on
  sorted_set :chat_ids

  def initialize(id)
    @id = id
  end

  def id
    @id
  end

  def join_to_chat(chat_id)
    chat_ids[chat_id] = Time.now.to_i
  end

  def chats
    issues = Issue.where(id: chat_ids.members)
    chat_ids.members(with_scores: true).map do |chat_id, time_int|
      issue = issues.find { |i| i.id == chat_id.to_i }
      chat  = Chat.new(chat_id)
      {
        id:              chat_id,
        title:           issue.subject,
        active:          !issue.closed?,
        archive:         issue.closed?,
        shared_key:      issue.chat_shared_key,
        last_visited_at: Time.zone.at(time_int),
        users:           chat.users
      }
    end
  end

end
