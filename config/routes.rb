resources :chat_messages, only: [:index, :create]
resources :chats, only: [:index, :show]
get 'chat_messages/:issue_id/listener' => 'chat_messages#listener'


namespace :chat_api, path: 'chat-api' do
  resources :chats, only: [:show] do
    resources :messages, except: [:new, :edit]
    member do
      post   :join
      post   :guest_join
      delete :exit
    end
  end
  resources :users, only: [:show] do
    member do
      put :mute
      put :unmute
    end
  end
end
