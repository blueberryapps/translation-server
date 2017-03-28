source 'https://rubygems.org'

ruby '2.4.0'

gem 'airbrake'
gem 'autoprefixer-rails'
gem 'bootstrap-kaminari-views'
gem 'bootstrap-switch-rails'
gem 'bootstrap-wysihtml5-rails'
gem 'coffee-rails', '~> 4.1.0'
gem 'devise'
gem 'dotenv-rails'
gem 'envied'
gem 'flutie'
gem 'font-awesome-rails'
gem 'highlight_js-rails'
gem 'jquery-rails'
gem 'kaminari'
gem 'pg'
gem 'puma'
gem 'pundit'
gem 'rails', '~> 5.0.0'
gem 'redcarpet'
gem 'responders'
gem 'rest-client'
gem 'sass-rails'
gem 'simple_form'
gem 'slim-rails'
gem 'uglifier', '>= 2.5.0'
gem 'virtus'
gem 'yajl-ruby', require: 'yajl'
gem 'yandex-translator'
gem 'rack-cors', require: 'rack/cors'
gem 'webpacker'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'capistrano', '~> 3.0.0'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'capistrano-rbenv'
  gem 'guard-rspec'
  gem 'mailcatcher'
  gem 'pry-rails'
  gem 'spring'
end

group :development, :test do
  gem 'hashie'
  gem 'factory_girl_rails'
  gem 'rspec-rails', '>= 3.1'
end

group :staging, :production do
  gem 'newrelic_rpm', '>= 3.9.6'
  gem 'rails_12factor' #for HEROKU
end

group :test do
  gem 'poltergeist', '>= 1.5.0'
  gem 'database_cleaner'
  gem 'simplecov', '~> 0.9.1', require: false
  gem 'shoulda-matchers', require: false
  gem 'webmock'
end

source 'https://rails-assets.org' do
  gem 'rails-assets-bootstrap-sass'
  gem 'rails-assets-jcrop',  '0.9.12'
end
