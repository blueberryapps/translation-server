module ApplicationHelper

  def back_key_path
    key_path.split('/')[0..-2].select(&:present?).join('/')
  end

  def build_key_path(key)
    [key_path, key].select(&:present?).join('/')
  end

  def build_key_path_url(key)
    [
      :browse,
      :translates,
      {
        key_path: key,
        query: @search.query
      }
    ]
  end

  def build_breadcumb(keys, separator = '.')
    current_keys = []
    links = keys.map do |k|
              current_keys << k
              link_to k, build_key_path_url(current_keys.join('/'))
            end
    separator ? links.join(separator).html_safe : links
  end
end
