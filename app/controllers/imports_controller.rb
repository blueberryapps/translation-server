class ImportsController < AuthController
  def index
    @import = ImportForm.new
    respond_with @import
  end

  def create
    @import = ImportForm.new params[:import_form]
    @import.save

    render :index
  end
end
