class LocalePolicy < ApplicationPolicy
  def manage?
    user.admin? || user.available_locales.include?(record.code)
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(code: user.available_locales)
      end
    end
  end
end
