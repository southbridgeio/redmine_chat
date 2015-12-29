require 'redmine'

Redmine::Plugin.register :redmine_chat do
  name 'Redmine Chat plugin'
  url 'https://github.com/centosadmin/redmine_chat'
  description 'This is a plugin for implement chat messaging in Redmine'
  version '0.0.1'
  author 'Centos-admin.ru'
  author_url 'http://centos-admin.ru'

  # project_module :chat
end
