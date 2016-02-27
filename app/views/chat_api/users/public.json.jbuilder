json.name @chat_user.name

json.settings do
  gravatar_param = @chat_user.email.present? ? @chat_user.email : @chat_user.name
  json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
end
