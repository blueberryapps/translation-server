class ImagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_image, only: [:show, :edit, :update, :destroy]

  # GET /images
  def index
    @images = Image.all
    respond_with @images
  end

  # GET /images/1
  def show
    respond_with @image
  end

  # GET /images/new
  def new
    @image = Image.new
    respond_with @image
  end

  # GET /images/1/edit
  def edit
    respond_with @image
  end

  # POST /images
  def create
    @image = Image.new(image_params)
    @image.save
    respond_with @image
  end

  # PATCH/PUT /images/1
  def update
    @image.update(image_params)
    respond_with @image
  end

  # DELETE /images/1
  def destroy
    @image.destroy
    respond_with @image, location: [:images]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def image_params
      params.require(:image).permit(:location_id, :key_id, :variant, :x, :y, :width, :height, :image)
    end
end
