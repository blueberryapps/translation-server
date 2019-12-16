class Project < ApplicationRecord
  has_many :locales, dependent: :destroy
  has_many :locations, dependent: :destroy
  has_many :keys, dependent: :destroy
  has_many :translations, through: :locales
  has_many :highlights, through: :locales
  has_many :releases, through: :locales
  has_many :images, through: :locations

  has_one :default_locale, class_name: 'Locale'
  has_one :translation_cache
  has_and_belongs_to_many :users

  before_create :ensure_api_token
  validates :api_token, uniqueness: true
  validates :name, length: { minimum: 3 }, uniqueness: true

  def cache_translations!
    cache           = translation_cache || build_translation_cache
    last_updated_at = translations.maximum(:updated_at)

    return if last_updated_at && cache.persisted? &&
                cache.updated_at > last_updated_at

    output = Translation.dump_hash(translations.include_dependencies)
    cache.update(
      cache_yaml: YAML.dump(output).html_safe,
      cache_json: output.to_json,
    )
  end

  def to_s
    name
  end

  def to_param
    "#{id}-#{ActiveSupport::Inflector.transliterate(name).parameterize}"
  end

  private

  def ensure_api_token
    self.api_token ||= generate_api_token
  end

  def generate_api_token
    loop do
      token = SecureRandom.hex(16)
      break token unless Project.exists?(api_token: token)
    end
  end
end
