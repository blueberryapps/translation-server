module ApplicationHelper

  def back_key_path
    key_path.split('/')[0..-2].select(&:present?).join('/')
  end

  def build_key_path(key)
    [key_path, key].select(&:present?).join('/')
  end
end
