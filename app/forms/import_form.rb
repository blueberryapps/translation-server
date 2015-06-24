class ImportForm
  include Virtus.value_object
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  ImporterError = Class.new(ArgumentError)
  ImportError = Class.new(ImporterError)
  ParsingError = Class.new(ImporterError)

  attribute :file
  attribute :text,      String, default: ''
  attribute :overwrite, Boolean, default: false

  def info
    if @error
      nil
    elsif @imported && @imported.any?
      "#{@imported.join('<br />')}"
    elsif file || text.present?
      if overwrite
        "All translations are already updated, so nothing was changed"
      else
        "All translations was already created, so nothing was imported"
      end
    end
  end

  def save
    import_data prepared_data
  rescue ImporterError => e
    @error = "#{e.class} #{e.message}"
  end

  def error
    @error
  end

  def persisted?
    false
  end

  private

  def convert_value(value)
    if value.is_a?(Array) || value.is_a?(Symbol)
      YAML.dump(value).gsub("---\n", '')
    else
      value
    end
  end

  def data_type(translation)
    case translation
    when Array      then 'array'
    when Integer    then 'integer'
    when Float      then 'float'
    when TrueClass  then 'boolean'
    when FalseClass then 'boolean'
    else 'string'
    end
  end

  def dot_hash(object, prefix = nil)
    if object.is_a? Hash
      object.map do |key, value|
        if prefix
          dot_hash value, "#{prefix}.#{key}"
        else
          dot_hash value, "#{key}"
        end
      end.reduce(&:merge)
    else
      {prefix => object}
    end
  end

  def import_data(data)
    @imported = []

    data.each do |locale, translations|
      locale = Locale.resolve(code: locale)

      dot_hash(translations).each do |key, translation|
        key = Key.resolve({ key: key }, { data_type: data_type(translation) })

        find_args   = { key: key, locale: locale }
        text        = convert_value(translation)

        translation = Translation.resolve(find_args, { text: text })
        if translation.new_record? && translation.save
          @imported << "Added <b>#{locale}.#{key}</b>: #{shorten_text(text)}"
        elsif overwrite && update_translation(translation, text)
          @imported << "Updated <b>#{locale}.#{key}</b>: #{shorten_text(text)}"
        end
      end
    end
  end

  def prepared_data
    data = parse_data
    return data if data.is_a?(Hash)
    raise ImportError, 'Data must be formatted well'
  end

  def parse_data
    case detect_format_type
    when :json then JSON.parse(readed_text)
    when :yaml then YAML.load(readed_text)
    else raise ImportError, 'Unable to parse data'
    end
  rescue StandardError => e
    raise ParsingError, e.message
  end

  def detect_format_type
    readed_text.strip[0] == '{' ? :json : :yaml
  end

  def readed_text
    if file
      @readed_text ||= file.read
    elsif text.present?
      @readed_text ||= text
    else
      raise ImportError, 'Unable to load data, plese select file or type text'
    end
  end

  def shorten_text(text)
    text.to_s.size > 40 ? "#{text.mb_chars[0..40]}..." : text
  end

  def update_translation(translation, text)
    translation.text.to_s.strip != text.to_s.strip &&
      translation.update(text: text)
  end
end
