class ImportsController < BaseProjectController
  def index
    @import = ImportForm.new
    respond_with @import
  end

  def create
    @import = ImportForm.new(
      params[:import_form].merge(
        available_locales: current_project.locales.map(&:code),
        project: current_project
      )
    )
    @import.save
    render :index
  end
end
