class RootController < ApplicationController
  def index
    @locales = policy_scope(Locale) if current_user
  end

  def is_alive
    render text: 'Yeah Treanslation server is alive'
  end
end
