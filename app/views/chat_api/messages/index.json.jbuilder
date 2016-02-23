json.total_messages_count @messages.total_entries
json.total_pages_count @messages.total_pages
json.current_page @messages.current_page

json.messages @messages do |message|
  json.id message.id
  json.name message.user_name
  json.created_at message.created_at
  json.message message.message
end
