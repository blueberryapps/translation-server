class TranslationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_translation, only: [:show, :edit, :update, :destroy]

  # GET /translations
  def index
    @translations = Translation.all
    respond_with @translations
  end

  # GET /translations/1
  def show
    respond_with @translation
  end

  # GET /translations/new
  def new
    @translation = Translation.new
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
    respond_with @translation
  end

  # PATCH/PUT /translations/1
  def update
    @translation.update(translation_params)
    respond_with @translation
  end

  # DELETE /translations/1
  def destroy
    @translation.destroy
    respond_with @translation, location: [:translations]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_translation
      @translation = Translation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def translation_params
      params.require(:translation).permit(:key_id, :locale_id, :text)
    end
end