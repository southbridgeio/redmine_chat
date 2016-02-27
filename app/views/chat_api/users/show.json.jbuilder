json.user_id @chat_user.id
json.name @chat_user.name
gravatar_param = @chat_user.email.present? ? @chat_user.email : @chat_user.name
json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
json.sounds_on @chat_user.sounds_on

json.chats @chat_user.chats do |chat_id, time_int|
  json.chat_id chat_id
  json.last_visited_at Time.zone.at(time_int)
end
