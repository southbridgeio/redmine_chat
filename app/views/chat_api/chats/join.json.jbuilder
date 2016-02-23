json.title @issue.subject
json.active !@issue.closed?
json.archive @issue.closed?
json.shared_key @issue.chat_shared_key

json.user do
  json.id @chat_user.id
  json.name @chat_user.name
  json.chats @chat_user.chat_ids.members(with_scores: true).reverse.each do |chat_id, time_int|
    json.id chat_id
    json.updated_at Time.zone.at(time_int)
  end
end

json.users @chat.users do |user|
  json.id user.id
  json.name user.name
  gravatar_param = user.email.present? ? user.email : user.name
  json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
end

