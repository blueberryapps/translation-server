class ReleasesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_release, only: [:show, :destroy]

  # GET /releases
  def index
    @releases = Release.order(version: :desc).page(params[:page])
    respond_with @releases
  end

  # GET /releases/1
  def show
    respond_with @release
  end

  # GET /releases/new
  def new
    @release = Release.new
    respond_with @release
  end

  # POST /releases
  def create
    @release = Release.new(release_params)
    @release.save
    respond_with @release,
                 location: URI(request.referer).path == "/" ? '/' : @release
  end

  # DELETE /releases/1
  def destroy
    @release.destroy
    respond_with @release, location: [:releases]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_release
      @release = Release.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def release_params
      params.require(:release).permit(:locale_id, :version, :yaml)
    end
end
