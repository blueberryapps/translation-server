class HighlightsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_highlight, only: [:show, :edit, :update, :destroy]

  # GET /highlights
  def index
    @highlights = Highlight.all
    respond_with @highlights
  end

  # GET /highlights/1
  def show
    respond_with @highlight
  end

  # GET /highlights/new
  def new
    @highlight = Highlight.new
    respond_with @highlight
  end

  # GET /highlights/1/edit
  def edit
    respond_with @highlight
  end

  # POST /highlights
  def create
    @highlight = Highlight.new(highlight_params)
    @highlight.save
    respond_with @highlight
  end

  # PATCH/PUT /highlights/1
  def update
    @highlight.update(highlight_params)
    respond_with @highlight
  end

  # DELETE /highlights/1
  def destroy
    @highlight.destroy
    respond_with @highlight, location: [:highlights]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_highlight
      @highlight = Highlight.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def highlight_params
      params.require(:highlight).permit(:image_id, :key_id, :x, :y, :width, :height)
    end
end
