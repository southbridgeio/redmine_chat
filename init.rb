require 'redmine'
require_dependency 'chat'
require_dependency 'chat/hook_listener'
require_dependency 'chat/faye_token'
require_dependency 'chat/patches/issue_patch'
require_dependency 'chat/patches/application_helper_patch'

Redmine::Plugin.register :redmine_chat do
  name 'Redmine Chat plugin'
  url 'https://github.com/centosadmin/redmine_chat'
  description 'This is a plugin for implement chat messaging in Redmine'
  version '1.1.1'
  author 'Centos-admin.ru'
  author_url 'http://centos-admin.ru'

  project_module :chat do
    permission :chatting, :chat_messages => :index
    permission :chatting, :chat_messages => :create
  end
end
