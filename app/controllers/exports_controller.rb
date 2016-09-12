class ExportsController < BaseProjectController
  before_action :set_locale
  def index
    @translations = Translation.with_locale(@locale).include_dependencies
    response.headers['Content-Disposition'] = disposition
  end

  private

  def disposition
    "attachment; filename=#{@locale}_#{Time.now.strftime('%FT%T')}.yml"
  end

  def set_locale
    @locale = current_project.locales.where(id: params[:locale]).first
  end
end
