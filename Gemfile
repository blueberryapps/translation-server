source 'https://rubygems.org'

ruby '2.1.5'

gem 'airbrake'
gem 'coffee-rails', '~> 4.1.0'
gem 'devise'
gem 'dotenv-rails'
gem 'flutie'
gem 'jquery-rails'
gem 'pg'
gem 'rails', '~> 4.1.6'
gem 'sass-rails', '~> 4.0.4'
gem 'simple_form'
gem 'slim-rails'
gem 'uglifier', '>= 2.5.0'

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
  gem 'factory_girl_rails'
  gem 'rspec-rails', '>= 3.1'
end

group :staging, :production do
  gem 'newrelic_rpm', '>= 3.9.6'
end

group :test do
  gem 'poltergeist', '>= 1.5.0'
  gem 'database_cleaner'
  gem 'simplecov', '~> 0.9.1', require: false
end

