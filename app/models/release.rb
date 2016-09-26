class Release < ActiveRecord::Base
  LATEST_VERSION = /_latest$/
  belongs_to :locale

  validates :locale, presence: true

  before_create     :dump_translations
  before_validation :ensure_version

  def self.with_versions(versions)
    versions.map do |version_text|
      if LATEST_VERSION =~ version_text
        locale_id = Locale.where(code: version_text.gsub(LATEST_VERSION, ''))
          .first.try(:id)

        self.where(locale_id: locale_id).order(created_at: :desc).first
      else
        self.where(version: version_text).first
      end
    end.select(&:present?)
  end

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
