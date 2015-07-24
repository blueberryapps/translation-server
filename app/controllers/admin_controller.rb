class AdminController < AuthController
  before_action :authorize_admin!

  private

  def authorize_admin!
    unless current_user.admin?
      redirect_to root_path, notice: 'You need admin role for this action'
    end
  end
end
