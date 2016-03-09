json.id @chat_user.id.to_s
json.name @chat_user.name

json.settings do
  gravatar_param = @chat_user.email.present? ? @chat_user.email : @chat_user.name
  json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
  json.sounds_on @chat_user.sounds_on
end

json.chats @chat_user.chats do |chat|
  json.id chat[:id]
  json.title chat[:title]
  json.active chat[:active]
  json.archive chat[:archive]
  json.shared_key chat[:shared_key]
  json.last_visited_at chat[:last_visited_at]

  json.users chat[:users], partial: 'chat_api/users/user', as: :user

end
