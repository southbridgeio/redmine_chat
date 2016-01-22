require 'faye'
# require 'logger'
#
# Faye.logger = Logger.new(STDOUT)

bayeux = Faye::RackAdapter.new(mount: '/redmine-chat', timeout: 25)
run bayeux
