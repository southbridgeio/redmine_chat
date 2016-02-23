module RedmineChat
  CHAT_COMMIT_HASH = `cd #{Rails.root}/plugins/redmine_chat && git rev-parse --short HEAD`.chomp

  def self.chat_url
    uri_params = {host: Setting['host_name'], path: '/redmine-chat/chat'}
    if Setting['protocol'] == 'https'
      URI::HTTPS.build(uri_params).to_s
    else
      URI::HTTP.build(uri_params).to_s
    end
  end

  def chat_url
    RedmineChat.chat_url
  end

  def self.commit_hash
    CHAT_COMMIT_HASH || Date.today.to_s
  end
end
