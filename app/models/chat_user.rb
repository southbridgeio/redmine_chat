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
    chat_ids.members(with_scores: true)
  end

end
