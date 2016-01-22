require 'faye'
# require 'logger'
#
# Faye.logger = Logger.new(STDOUT)

# Faye::WebSocket.load_adapter('thin')

bayeux = Faye::RackAdapter.new(mount: '/redmine_chat', timeout: 25)
run bayeux
