json.messages @messages do |message|
  json.id message.id
  json.name message.user_name
  json.created_at message.created_at.to_i
  json.message message.message
  json.stared message.stared
end
json.total @total_messages
