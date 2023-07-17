Rails.application.routes.draw do
  resources :users do
    collection do
      post 'login'
    end
  end
  resources :userstatuses
  resources :posts
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
