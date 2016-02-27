json.id user.id
json.name user.name
gravatar_param = user.email.present? ? user.email : user.name
json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
