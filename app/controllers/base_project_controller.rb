class BaseProjectController < AuthController
  before_action :set_project

  def current_project
    @project
  end

  private

  def set_project
    @project = Project.where(id: params[:project_id]).first
    authorize(@project) if @project
  end
end
