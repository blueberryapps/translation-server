class KeysController < ApplicationController
  before_action :set_key, only: [:show, :edit, :update, :destroy]

  # GET /keys
  def index
    @keys = Key.all
  end

  # GET /keys/1
  def show
  end

  # GET /keys/new
  def new
    @key = Key.new
  end

  # GET /keys/1/edit
  def edit
  end

  # POST /keys
  def create
    @key = Key.new(key_params)

    if @key.save
      redirect_to @key, notice: 'Key was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /keys/1
  def update
    if @key.update(key_params)
      redirect_to @key, notice: 'Key was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /keys/1
  def destroy
    @key.destroy
    redirect_to keys_url, notice: 'Key was successfully destroyed.'
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
