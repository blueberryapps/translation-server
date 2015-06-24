class Key < ActiveRecord::Base
  include Resolvable

  DATA_TYPES = %w(string array integer float)

  has_many :highlights, dependent: :destroy
  has_many :images, through: :highlights

  has_many :translations, dependent: :destroy
  has_many :locales,   through: :translations
  has_many :locations, through: :images

  validates :key, uniqueness: true, length: { minimum: 1 }

  scope :alphabetical,  -> { order :key }
  scope :with_key_path, -> (key_path) { where 'key like ?', "#{key_path}%" }

  def self.with_locale(locale)
    joins(:translations).where translations: { locale: locale }
  end

  def self.with_query(query)
    string = "%#{query.to_s.mb_chars.downcase}%"
    joins(:translations).where 'lower(key) like ? or lower(translations.text) like ?', string, string
  end

  def self.with_location(location)
    joins(:locations).where locations: { id: location }
  end

  def self.hierarchy(keys)
    keys.each_with_object({}) do |key, hash|
      hash.deep_merge! hierarchical_hash_from_array(key.key.split('.') + [{}])
    end
  end

  def normalized_key
    I18n.normalize_keys(nil, key, nil, '.')
  end

  def normalize_value(value)
    case data_type
    when 'array' then YAML.load(value) || []
    when 'integer' then value.to_i
    when 'float' then value.to_f
    else value
    end
  end

  def to_s
    key
  end

  def default_text
    translations.where(locale: Locale.default).first.try(:text) || note
  end

  def self.hierarchical_hash_from_array(array_hierarchy, hash_hierarchy = {})
    return hash_hierarchy if array_hierarchy.empty?

    if hash_hierarchy.empty?
      value = array_hierarchy.pop
      hash_hierarchy.merge!(array_hierarchy.pop => value)
    else
      hash_hierarchy = { array_hierarchy.pop => hash_hierarchy }
    end

    return hierarchical_hash_from_array(array_hierarchy, hash_hierarchy)
  end
end
