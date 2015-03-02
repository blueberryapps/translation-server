class TranslatesController < ApplicationController
  helper_method :key_path
  helper_method :locale

  def index
    @keys = Key.alphabetical.with_locale(locale)
    if key_path
      @keys = @keys.with_key_path(key_path.gsub('/', '.'))
    end

    @hierarchy = Key.hierarchy(@keys)

    if key_path_splitted.any?
      key_path_splitted.each do |key|
        @hierarchy = @hierarchy[key]
      end
    end
  end

  def key_path
    @key_path = params[:key_path].presence || ''
  end

  def key_path_splitted
    key_path.split('/')
  end

  def locale
    if params[:locale]
      session[:locale_id] = params[:locale]
    end

    Locale.find(session[:locale_id] || Locale.first.id)
  end
end