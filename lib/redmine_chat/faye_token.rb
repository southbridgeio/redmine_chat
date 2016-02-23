require 'yaml'
config = YAML.load_file(File.expand_path('../../../config/chat.yml', __FILE__))
FAYE_TOKEN = config['chat_token']
