class ReleasePolicy < ApplicationPolicy
  def manage?
    user.can_manage_locale? record.locale
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.joins(:locale).where('locales.code' => user.available_locales)
      end
    end
  end
end
