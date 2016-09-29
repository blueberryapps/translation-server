module ApplicationHelper

  def back_key_path
    key_path.split('/')[0..-2].select(&:present?).join('/')
  end

  def build_key_path(key)
    [key_path, key].select(&:present?).join('/')
  end

  def build_key_path_url(key)
    [
      :project,
      :browse,
      {
        locale_code: locale.code,
        project_id: current_project.id,
        key_path: key,
        edited_filter: @edited_filter
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

  def hint_translation(text)
    available_locales = %w(
      sq ar hy az be bs bg ca zh hr cs da nl et fi fr ka de el he hu is id it ja
      lv lt mk ms mt no pl pt ro ru sr sk sl es sv th tr uk vi
    )

    if available_locales.include?(locale.to_s) && text.present?
      klass = 'hint_default_translate'
      text  = text
    else
      text  = ''
      klass = 'disabled'
    end

    "<span class='#{klass} btn btn-xs btn-primary' title='Translated to: #{locale.to_s.upcase}' data-text='#{text}'>
        <i class='fa fa-question'></i>
    </span>".html_safe
  end
end
