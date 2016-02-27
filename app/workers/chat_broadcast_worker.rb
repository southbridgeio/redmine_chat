class ChatBroadcastWorker
  require 'net/https'
  require 'digest/md5'

  include Sidekiq::Worker

  def perform(channel, message_type, json_data)
    message = { channel: channel,
                data:    {
                  type:    message_type,
                  payload: json_data
                },
                ext:     { auth_token: FAYE_TOKEN } }

    uri = URI.parse RedmineChat.chat_url

    Net::HTTP.post_form(uri, message: message.to_json)
  end

end
