class LocalesController < ApplicationController
  before_action :set_locale, only: [:show, :edit, :update, :destroy]

  # GET /locales
  def index
    @locales = Locale.all
  end

  # GET /locales/1
  def show
  end

  # GET /locales/new
  def new
    @locale = Locale.new
  end

  # GET /locales/1/edit
  def edit
  end

  # POST /locales
  def create
    @locale = Locale.new(locale_params)

    if @locale.save
      redirect_to @locale, notice: 'Locale was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /locales/1
  def update
    if @locale.update(locale_params)
      redirect_to @locale, notice: 'Locale was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /locales/1
  def destroy
    @locale.destroy
    redirect_to locales_url, notice: 'Locale was successfully destroyed.'
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
