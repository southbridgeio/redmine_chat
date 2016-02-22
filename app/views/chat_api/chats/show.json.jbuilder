json.title @issue.subject
json.active !@issue.closed?
json.archive @issue.closed?
json.shared_key @issue.chat_shared_key

json.users @issue.chat_users do |user|
  json.id user.id
  json.name user.name
  gravatar_param = user.mail.present? ? user.mail : user.name
  json.photo_url gravatar_url(gravatar_param, default: 'identicon')
end
