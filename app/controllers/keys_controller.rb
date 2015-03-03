class KeysController < ApplicationController
  before_action :authenticate_user!
  before_action :set_key, only: [:show, :edit, :update, :destroy]

  # GET /keys
  def index
    @keys = Key.alphabetical.page(params[:page])
    respond_with @keys
  end

  # GET /keys/1
  def show
    respond_with @key
  end

  # GET /keys/new
  def new
    @key = Key.new
    respond_with @key
  end

  # GET /keys/1/edit
  def edit
    respond_with @key
  end

  # POST /keys
  def create
    @key = Key.new(key_params)
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
    respond_with @key, location: [:keys]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_key
      @key = Key.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def key_params
      params.require(:key).permit(:key, :note, :array)
    end
end
