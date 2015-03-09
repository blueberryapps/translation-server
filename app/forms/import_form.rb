class ImportForm
  include Virtus.value_object
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attribute :file

  def info
    "#{@imported} locales"
  end

  def save
    @imported = 0

    YAML.load(file.read).each do |locale, translations|
      locale = Locale.resolve(code: locale)

      dot_hash(translations).each do |key, translation|
        key = Key.resolve({ key: key }, { data_type: data_type(translation) })

        find_args   = { key: key, locale: locale }
        text        = convert_value(translation)

        translation = Translation.resolve(find_args, {text: text }).save
        @imported += 1
      end
    end
  end

  def persisted?
    false
  end

  private

  def data_type(translation)
    case translation
    when Array   then 'array'
    when Integer then 'integer'
    when Float   then 'float'
    else 'string'
    end
  end

  def convert_value(translation)
    case translation
    when Array then YAML.dump(translation).gsub("---\n", '')
    else translation
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
end
