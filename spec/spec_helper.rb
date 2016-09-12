require 'simplecov'
SimpleCov.start 'rails' do
  add_filter "/lib/tasks"
  add_filter ".bundle"
  add_group 'Modules',    'app/modules'
  add_group 'Validators', 'app/validators'
  add_group 'Workers',    'app/workers'
end

ENV['RAILS_ENV'] = 'test'

require File.expand_path('../../config/environment', __FILE__)

require 'rspec/rails'
require 'shoulda/matchers'
require 'capybara/poltergeist'
require 'webmock/rspec'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |file| require file }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end

  config.fail_fast = false
  config.infer_base_class_for_anonymous_controllers = false
  config.order = 'random'
  config.use_transactional_fixtures = false

  config.render_views

  config.include Devise::TestHelpers, type: :controller
end

Capybara.javascript_driver = :poltergeist

