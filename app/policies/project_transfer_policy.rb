class ProjectTransferPolicy < ApplicationPolicy
  def manage?
    user.admin?
  end
end
