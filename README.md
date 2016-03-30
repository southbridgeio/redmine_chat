# redmine_chat

copy unicorn.rb example to redmine/config/unicorn.rb
and than run
```unicorn -c config/unicorn.rb```

also you can see in nginx.example

add to Gemfile.local

gem 'puma'

create chat.yml in config directory from example


puma -C plugins/redmine_chat/config/puma.rb



to start frontend dev-server:
```npm start```

to build for production:
```npm run build```
