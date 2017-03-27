class KeysController < BaseProjectController
  before_action :set_key, only: [:show, :edit, :update, :destroy]

  # GET /keys
  def index
    @search = SearchForm.new(search_params)
    @keys   = @search.resolve.page(params[:page])
    respond_with @keys
  end

  # GET /keys/1
  def show
    respond_with @key
  end

  # GET /keys/new
  def new
    @key = current_project.keys.build
    respond_with @key
  end

  # GET /keys/1/edit
  def edit
    respond_with @key
  end

  # POST /keys
  def create
    @key = current_project.keys.build(key_params)
    @key.save
    respond_with @key
  end

  # PATCH/PUT /keys/1
  def update
    @key.update(key_params)
    respond_with @key
  end

  # DELETE /keys/1
  def destroy
    @key.destroy
    respond_with @key, location: request.referer || [@key.project, :keys]
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_key
    @key = Key.find(params[:id])
    @project ||= @key.project
    authorize(@project) if @project
  end

  # Only allow a trusted parameter "white list" through.
  def key_params
    params.require(:key).permit(:key, :note, :data_type)
  end

  def search_params
    {
      query:    params[:query],
      scope:    current_project.keys.alphabetical
    }
  end
end
