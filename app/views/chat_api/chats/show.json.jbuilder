json.title @issue.subject
json.active !@issue.closed?
json.archive @issue.closed?
json.shared_key @issue.chat_shared_key

json.users @chat.users do |user|
  json.id user.id
  json.name user.name
  gravatar_param = user.email.present? ? user.email : user.name
  json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
end
