class ImagesController < BaseProjectController
  before_action :set_image, only: [:show, :display, :edit, :update, :destroy]

  # GET /images
  def index
    @images = current_project.images.alphabetical.page(params[:page])
    respond_with @images
  end

  # GET /images/1
  def show
    respond_with @image
  end

  def display
    return unless stale? etag: [@image.updated_at]
    send_data @image.binary,
              content_type: @image.content_type,
              disposition:  'inline'
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
    respond_with @image, location: [@image.project, :images]
  end

  private
  def set_image
    @image = Image.find(params[:id])
  end

  def image_params
    params.require(:image).permit(
      :location_id, :variant, :name, :image, :image_file
    )
  end
end
