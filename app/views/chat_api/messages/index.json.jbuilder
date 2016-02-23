json.messages @messages do |message|
  json.id message.id
  json.name message.user_name
  json.created_at message.created_at
  json.message message.message
end
