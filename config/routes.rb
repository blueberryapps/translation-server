Rails.application.routes.draw do
  devise_for :users
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :translations, only: [:index, :create]
    end
  end

  resources :images

  resources :locations

  resources :keys

  resources :locales

  resources :translations

  root to: 'root#index'
end
