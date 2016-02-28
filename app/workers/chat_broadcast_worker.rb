class ChatBroadcastWorker
  require 'net/https'
  require 'digest/md5'

  include Sidekiq::Worker

  def perform(user_ids, channel, message_type, json_data)
    if user_ids.is_a?(Array)
      user_ids.each do |user_id|
        user_chanel = "user/#{user_id}"
        CHAT_REDIS.publish(user_chanel, { channel: channel,
                                          type:    message_type,
                                          payload: json_data }.to_json)
      end
    else
      user_chanel = "user/#{user_ids}"
      CHAT_REDIS.publish(user_chanel, { channel: channel,
                                        type:    message_type,
                                        payload: json_data }.to_json)
    end


  end

end
