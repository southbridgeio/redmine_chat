class ChatBroadcastWorker
  require 'net/https'
  require 'digest/md5'

  include Sidekiq::Worker

  def perform(chat_message_id)
    chat_message = ChatMessage.find chat_message_id
    channel = '/messages/new'
    message = {channel: channel,
               data: {
                 message: chat_message.message,
                 time: chat_message.created_at,
                 name: chat_message.user.try(:name),
                 user_id: chat_message.user_id,
                 issue_id: chat_message.issue_id
               },
               ext: {auth_token: chat_message_token(chat_message.issue_id, chat_message.id).chomp,
                     issue_id: chat_message.issue_id,
                     message_id: chat_message.id}}

    uri = URI.parse Chat.chat_url

    Net::HTTP.post_form(uri, message: message.to_json)
  end

  def chat_message_token(issue_id, message_id)
    Base64.encode64 "#{FAYE_TOKEN}-#{issue_id}-#{message_id}"
  end
end
