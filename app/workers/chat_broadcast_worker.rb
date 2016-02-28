class ChatBroadcastWorker
  require 'net/https'
  require 'digest/md5'

  include Sidekiq::Worker

  def perform(channel, message_type, json_data)
    CHAT_REDIS.publish(channel, { channel: channel,
                                  type:    message_type,
                                  payload: json_data }.to_json)
  end

end
