resources :chat_messages, only: [:index, :create]
get 'chat_messages/:issue_id/listener' => 'chat_messages#listener'
