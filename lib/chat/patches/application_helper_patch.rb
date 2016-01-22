module Chat
  module ApplicationHelperPatch
    def self.included(base) # :nodoc:
      base.module_eval do
        unloadable


        def chat_url
          uri_params = {host: Setting['host_name'], path: '/redmine-chat'}
          if Setting['protocol'] == 'https'
            URI::HTTPS.build(uri_params).to_s
          else
            URI::HTTP.build(uri_params).to_s
          end
        end

        def chat_broadcast(channel, &block)
          message = {channel: channel, data: capture(&block)}

          uri = URI.parse chat_url
          if Setting['protocol'] == 'https'
            Net::HTTPS.post_form(uri, message: message.to_json)
          else
            Net::HTTP.post_form(uri, message: message.to_json)
          end

        end
      end
    end

  end
end
ApplicationHelper.send(:include, Chat::ApplicationHelperPatch)
