require 'redmine'
require_dependency 'chat/hook_listener'
require_dependency 'chat/patches/issue_patch'

require 'msngr/clients/redis'

client    = Msngr::Clients::Redis.new
CHAT_MESSENGER = Msngr.new(client).tap(&:listen!)
CHAT_REDIS     = Redis.new

Redmine::Plugin.register :redmine_chat do
  name 'Redmine Chat plugin'
  url 'https://github.com/centosadmin/redmine_chat'
  description 'This is a plugin for implement chat messaging in Redmine'
  version '0.0.5'
  author 'Centos-admin.ru'
  author_url 'http://centos-admin.ru'

  project_module :chat do
    permission :chatting, :chat_messages => :index
    permission :chatting, :chat_messages => :create
  end
end
