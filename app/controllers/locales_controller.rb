class LocalesController < BaseProjectController
  before_action :set_locale, only: [:show, :edit, :update, :destroy]

  # GET /locales
  def index
    @locales = current_project.locales.alphabetical.page(params[:page])
    respond_with @locales
  end

  # GET /locales/1
  def show
    respond_with @locale
  end

  # GET /locales/new
  def new
    @locale = current_project.locales.build
    respond_with @locale
  end

  # GET /locales/1/edit
  def edit
    respond_with @locale
  end

  # POST /locales
  def create
    @locale = current_project.locales.build(locale_params)
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
    respond_with @locale, location: [@locale.project, :locales]
  end

  private

  def set_locale
    @locale = Locale.find(params[:id])
    @project ||= @locale.project
    authorize(@project) if @project
  end

  def locale_params
    params.require(:locale).permit(:code)
  end
end
