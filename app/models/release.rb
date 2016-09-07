class Release < ActiveRecord::Base
  belongs_to :locale

  validates :locale, presence: true

  before_create     :dump_translations
  before_validation :ensure_version

  def to_list
    {
      locale:  locale.to_s,
      version: version,
      created_at: created_at
    }
  end

  def as_json(*)
    YAML.load(yaml)
  end

  private

  def default_version
    "#{locale}_v000"
  end

  def dump_translations
    translations = Translation.with_locale(locale).include_dependencies
    self.yaml = YAML.dump Translation.dump_hash(translations)
  end

  def ensure_version
    self.version ||= next_version(find_last_version || default_version)
  end

  def find_last_version
    self.class.where(locale: locale).order(:created_at).last.try(:version)
  end

  def next_version(previous_version)
    number = previous_version.split('_v').last.to_i + 1
    "#{locale}_v#{number.to_s.rjust(3, "0")}"
  end
end
