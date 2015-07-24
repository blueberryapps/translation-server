class ImportsController < AuthController
  def index
    @import = ImportForm.new
    respond_with @import
  end

  def create
    params[:import_form]
    @import = ImportForm.new params[:import_form].
                               merge(available_locales: policy_scope(Locale).
                                                          map(&:code))
    @import.save
    render :index
  end
end
