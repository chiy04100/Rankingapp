Rails.application.routes.draw do
  resources :friendships
  resources :friend_requests, only: [:index, :destroy]
  resources :friend_button, only: [:index, :show]
  resources :friend_statuses
  resources :users do
    collection do
      post 'login'
    end
  end
  resources :userstatuses
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
