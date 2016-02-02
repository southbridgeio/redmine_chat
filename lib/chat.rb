module Chat
  def self.chat_url
    uri_params = {host: Setting['host_name'], path: '/redmine-chat/chat'}
    if Setting['protocol'] == 'https'
      URI::HTTPS.build(uri_params).to_s
    else
      URI::HTTP.build(uri_params).to_s
    end
  end

  def chat_url
    Chat.chat_url
  end
end
