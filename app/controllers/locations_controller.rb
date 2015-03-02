class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :update, :destroy]

  # GET /locations
  def index
    @locations = Location.all
    respond_with @locations
  end

  # GET /locations/1
  def show
    respond_with @location
  end

  # GET /locations/new
  def new
    @location = Location.new
    respond_with @location
  end

  # GET /locations/1/edit
  def edit
    respond_with @location
  end

  # POST /locations
  def create
    @location = Location.new(location_params)
    @location.save
    respond_with @location
  end

  # PATCH/PUT /locations/1
  def update
    @location.update(location_params)
    respond_with @location
  end

  # DELETE /locations/1
  def destroy
    @location.destroy
    respond_with @location, location: locations_url
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def location_params
      params.require(:location).permit(:path)
    end
end
