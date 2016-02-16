class ReleasesController < AuthController
  before_action :set_release!, only: [:show, :destroy]

  # GET /releases
  def index
    @releases = policy_scope(Release).order(version: :desc).page(params[:page])
    respond_with @releases
  end

  # GET /releases/1
  def show
    @release
  end

  # GET /releases/new
  def new
    @release = Release.new
    respond_with @release
  end

  # POST /releases
  def create
    @release = Release.new(release_params)
    ReleasePolicy.new(current_user, @release).manage?
    @release.save
    respond_with @release,
                 location: redirect_to_root? ? '/' : @release
  end

  # DELETE /releases/1
  def destroy
    @release.destroy
    respond_with @release, location: [:releases]
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_release!
    @release = Release.find(params[:id])
    ReleasePolicy.new(current_user, @release).manage?
  end

  # Only allow a trusted parameter "white list" through.
  def release_params
    params.require(:release).permit(:locale_id, :version, :yaml)
  end

  def redirect_to_root?
    request.referer && URI(request.referer).path == '/'
  end
end
