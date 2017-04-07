class ReactController < AuthController
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
end
