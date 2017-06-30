class ReactController < AuthController
  protect_from_forgery with: :exception, only: :index
  layout 'react'
  def index
    @initial_state = {
      user: {
        admin: current_user.admin?,
        email: current_user.email,
        username: current_user.username,
        photo: current_user.photo_url(20)
      }
    }
  end

  def script
    send_file(Rails.root.join('app', 'assets', 'react.js'))
  end
end
