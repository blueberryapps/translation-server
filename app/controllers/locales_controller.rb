class LocalesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_locale, only: [:show, :edit, :update, :destroy]

  # GET /locales
  def index
    @locales = Locale.alphabetical.page(params[:page])
    respond_with @locales
  end

  # GET /locales/1
  def show
    respond_with @locale
  end

  # GET /locales/new
  def new
    @locale = Locale.new
    respond_with @locale
  end

  # GET /locales/1/edit
  def edit
    respond_with @locale
  end

  # POST /locales
  def create
    @locale = Locale.new(locale_params)
    @locale.save
    respond_with @locale
  end

  # PATCH/PUT /locales/1
  def update
    @locale.update(locale_params)
    respond_with @locale
  end

  # DELETE /locales/1
  def destroy
    @locale.destroy
    respond_with @locale, location: [:locales]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_locale
      @locale = Locale.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def locale_params
      params.require(:locale).permit(:code)
    end
end
