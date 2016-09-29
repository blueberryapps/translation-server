class TranslatesController < BaseProjectController
  helper_method :key_path
  helper_method :key_path_splitted
  helper_method :locale

  def index
    if locale
      @search = SearchForm.new(search_params)
      @edited_filter = @search.edited_filter
      @keys   = @search.resolve.uniq

      @hierarchy = current_project.keys.hierarchy(@search.resolve)
      @locations = current_project.locations.alphabetical

      if key_path
        @keys = @keys.with_key_path(key_path.gsub('/', '.'))
      end

      @keys = @keys.page(params[:page])
    else
      render 'no_locale'
    end
  end

  def hint
    render json: { text: translator.translate(params[:text], to: locale) }
  end

  def key_path
    @key_path = params[:key_path].presence || ''
  end

  def key_path_splitted
    key_path.split('/')
  end

  def locale
    return @locale if @locale

    if params[:locale_code]
      session[:locale_code] = params[:locale_code]
    end

    @locale = current_project.locales.where(code: session[:locale_code]).first || current_project.locales.first
  end

  private

  def search_params
    {
      location:      params[:location],
      query:         params[:query],
      scope:         current_project.keys.alphabetical.with_locale(locale),
      edited_filter: params[:edited_filter].presence || 'all'
    }
  end

  def translator
    @translator ||= Yandex::Translator.new(ENVied.YANDEX_KEY)
  end
end
