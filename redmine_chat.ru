require 'faye'

bayeux = Faye::RackAdapter.new(mount: '/redmine-chat/chat', timeout: 25)
run bayeux
