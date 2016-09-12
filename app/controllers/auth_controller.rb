class AuthController < ApplicationController
  before_action :authenticate_user!
  helper_method :current_project

  def current_project
    nil
  end
end
