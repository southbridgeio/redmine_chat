resources :chat_messages, only: [:index, :create]
resources :chats, only: [:index, :show]
get 'chat_messages/:issue_id/listener' => 'chat_messages#listener'
