require 'connection_pool'
Redis::Objects.redis = ConnectionPool.new(size: 5, timeout: 5) { Redis.new(host: '127.0.0.1', port: 6379) }

require 'redmine'
require_dependency 'redmine_chat'
require_dependency 'redmine_chat/hook_listener'
require_dependency 'redmine_chat/faye_token'
require_dependency 'redmine_chat/patches/issue_patch'
require_dependency 'redmine_chat/patches/application_helper_patch'

Redmine::Plugin.register :redmine_chat do
  name 'Redmine Chat plugin'
  url 'https://github.com/centosadmin/redmine_chat'
  description 'This is a plugin for implement chat messaging in Redmine'
  version '1.3.6'
  author 'Centos-admin.ru'
  author_url 'http://centos-admin.ru'

  project_module :chat do
    permission :chatting, :chat_messages => :index
    permission :chatting, :chat_messages => :create
  end
end
