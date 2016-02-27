json.id @issue.id
json.title @issue.subject
json.active !@issue.closed?
json.archive @issue.closed?
json.shared_key @issue.chat_shared_key

json.users @chat.users, partial: 'chat_api/users/user', as: :user
