class ReleasePolicy < ProjectPolicy
  def manage?
    user.projects.include?(record.project)
  end
end
