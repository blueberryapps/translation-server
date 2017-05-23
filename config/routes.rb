Rails.application.routes.draw do

  resources :projects do
    resources :releases, except: [:edit, :update], shallow: true

    resources :imports, only: [:index, :create]
    resources :exports, only: :index

    get '/:locale_code/browse/:edited_filter/*key_path' => 'translates#index', as: :browse
    get '/:locale_code/translates' => 'translates#index', as: :translates
    post '/:locale_code/translates' => 'translates#index'

    resources :locations, shallow: true

    resources :keys, shallow: true

    resources :locales, shallow: true

    resources :translations, shallow: true

    resources :highlights, shallow: true

    resources :images, shallow: true do
      get :display, on: :member
    end
  end

  match '/transfer' => 'transfer#index', via: [:get], as: :transfer
  match '/transfer' => 'transfer#create', via: [:post]

  get '/translates/hint' => 'translates#hint', as: :hint_translates

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :images,       only: :create
      resources :translations, only: [:index, :create]
      resources :releases,     only: [:index, :show]
      resources :changes,      only: :index
      match 'releases',     to: 'releases#index_head',     via: [:head]
      match 'releases/:id', to: 'releases#show_head',      via: [:head]
      match 'translations', to: 'translations#index_head', via: [:head]
      match 'transfer/:locale_codes', to: 'transfer#index', via: [:get]
    end
  end

  namespace :api_frontend, defaults: { format: :json } do
    namespace :v1 do
      get 'me' => 'users#show'
      post 'login' => 'users#create'
      delete 'logout' => 'users#destroy'

      resources :translations, only: [:show, :update, :destroy] do
        put 'locale/:locale/key/:key', on: :collection, action: :update
        put '/', action: :update_many, on: :collection
      end

      resources :projects, only: [:show, :index, :create, :update, :destroy] do

        resources :keys, only: [:show, :index, :create, :update, :destroy], shallow: true do
          get :hierarchy, on: :collection
        end

        resources :locales, only: [:show, :index, :create, :update, :destroy], shallow: true do
          resources :keys, only: [:index] do
            get :hierarchy, on: :collection
          end
        end
      end
    end
  end

  devise_for :users
  resources :users

  resource :developer

  resources :restricted_ips, only: [:index, :create, :destroy]

  match '/react_script.js' => 'react#script', via: :get, as: :react_script
  match '/app' => 'react#index', via: :get
  match '/app/*slug' => 'react#index', via: :get
  match '/is_alive' => 'root#is_alive', via: [:get]

  root to: 'projects#index'
end
