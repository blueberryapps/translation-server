class ImportsController < ApplicationController
  def index
    @import = ImportForm.new
    respond_with @import
  end

  def create
    @import = ImportForm.new params[:import_form]
    @import.save
    redirect_to [:imports], notice: "Imported: #{@import.info}"
  end
end
