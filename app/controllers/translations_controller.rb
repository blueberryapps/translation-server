class TranslationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_translation, only: [:show, :edit, :update, :destroy]

  # GET /translations
  def index
    @translations = Translation.alphabetical.page(params[:page])
    respond_with @translations
  end

  # GET /translations/1
  def show
    respond_with @translation
  end

  # GET /translations/new
  def new
    @redirect_to = success_location
    @translation = Translation.new(new_translation_params)
    respond_with @translation
  end

  # GET /translations/1/edit
  def edit
    respond_with @translation
  end

  # POST /translations
  def create
    @translation = Translation.new(translation_params)
    @translation.save
    respond_with @translation, location: location_after_create
  end

  # PATCH/PUT /translations/1
  def update
    @translation.update(translation_params)

    if request.xhr?
      head :ok
    else
      respond_with @translation
    end
  end

  # DELETE /translations/1
  def destroy
    @translation.destroy
    respond_with @translation,
                 location: success_location
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_translation
    @translation = Translation.find(params[:id])
  end

  def success_location
    request.referer ? request.referer : [:translations]
  end

  def location_after_create
    params[:redirect_to].present? ? params[:redirect_to] : success_location
  end

  # Only allow a trusted parameter "white list" through.
  def new_translation_params
    params.permit(:key_id, :locale_id)
  end

  # Only allow a trusted parameter "white list" through.
  def translation_params
    params
      .require(:translation)
      .permit(:key_id, :locale_id, :text)
      .merge(edited: true)
  end
end
