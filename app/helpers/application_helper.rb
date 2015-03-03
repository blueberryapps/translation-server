module ApplicationHelper

  def back_key_path
    key_path.split('/')[0..-2].select(&:present?).join('/')
  end

  def build_key_path(key)
    [key_path, key].select(&:present?).join('/')
  end

  def build_breadcumb(keys)
    current_keys = []
    keys.map do |k|
      current_keys << k
      link_to k, [:browse, :translates, key_path: current_keys.join('/')]
    end.join('/').html_safe
  end
end
