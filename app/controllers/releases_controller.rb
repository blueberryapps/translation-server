class ReleasesController < BaseProjectController
  before_action :set_release!, only: [:show, :destroy]

  # GET /releases
  def index
    @releases = current_project.releases.order(version: :desc).page(params[:page])
    respond_with @releases
  end

  # GET /releases/1
  def show
    respond_with @release
  end

  # GET /releases/new
  def new
    @release = current_project.releases.build
    respond_with @release
  end

  # POST /releases
  def create
    Translation.approve!(current_project.locales.find(params[:release][:locale_id]).translations.not_approved, current_user)
    @release = current_project.releases.build(release_params)
    authorize @release, :manage?
    @release.save
    respond_with @release,
                 location: redirect_to_root? ? '/' : @release
  end

  # DELETE /releases/1
  def destroy
    @release.destroy
    respond_with @release, location: [@release.project, :releases]
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_release!
    @release = Release.find(params[:id])
    authorize @release, :manage?
    @project ||= @release.project
  end

  # Only allow a trusted parameter "white list" through.
  def release_params
    params.require(:release).permit(:locale_id, :version, :yaml)
  end

  def redirect_to_root?
    request.referer && URI(request.referer).path == '/'
  end
end
