class ProjectPolicy < ApplicationPolicy
  def manage?
    user.admin? || user.projects.include?(record)
  end

  alias_method :index?,       :manage?
  alias_method :show?,        :manage?
  alias_method :update?,      :manage?
  alias_method :update_many?, :manage?
  alias_method :create?,      :manage?
  alias_method :destroy?,     :manage?
  alias_method :hierarchy?,   :manage?

  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        user.projects
      end
    end
  end
end
