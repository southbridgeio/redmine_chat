class Chat
  include Redis::Objects

  set :user_ids

  def initialize(id)
    @id = id
  end

  def id
    @id
  end

  def users
    user_ids.map do |user_id|
      ChatUser.new(user_id)
    end
  end

  def user_join(user_id)
    user_ids << user_id
  end
end
