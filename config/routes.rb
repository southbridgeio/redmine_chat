resources :chat_messages, only: [:index, :create]
resources :chats, only: [:index, :show]
get 'chat_messages/:issue_id/listener' => 'chat_messages#listener'

namespace :chat_api, path: 'chat-api', format: 'json' do
  resources :chats, only: [:show] do
    resources :messages, except: [:new, :edit]
    member do
      post :join
      post :guest_join
      post :invite
      post :exit
    end
  end
  get 'account' => 'users#show'
  put 'account/mute' => 'users#mute'
  put 'account/unmute' => 'users#unmute'
  put 'account/update_last_visited' => 'users#update_last_visited'
end
