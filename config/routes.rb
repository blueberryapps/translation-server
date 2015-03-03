Rails.application.routes.draw do

  resources :translates, only: :index do
    collection do
      get 'browse/*key_path' => 'translates#index', as: :browse
    end
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :translations, only: [:index, :create]
      resources :images,       only: :create
      match 'images', to: 'images#create', via: [:options]
    end
  end

  resources :images do
    get :display, on: :member
  end

  resources :locations

  resources :keys

  resources :locales

  resources :translations

  devise_for :users
  resources :users

  resource :developer

  root to: 'root#index'
end
