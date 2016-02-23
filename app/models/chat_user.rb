class ChatUser
  include Redis::Objects
  value :name
  value :email
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

end
