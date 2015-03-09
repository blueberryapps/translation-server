class Translation < ActiveRecord::Base
  include Resolvable

  belongs_to :key
  belongs_to :locale

  scope :alphabetical, -> { order :id }
  scope :with_locale,  -> (locale) { where locale: locale }

  validates :key, uniqueness: { scope: :locale }
  validates :key, :locale, presence: true

  def self.dump_hash(scope)
    scope.each_with_object({}) do |translation, hash|
      hash.deep_merge! translation.to_hierarchical_h
    end
  end

  def self.resolve(where_params = {}, initialize_params = {})
    where(where_params).first_or_initialize(initialize_params)
  end

  def to_s
    text
  end

  def parsed_text
    key.normalize_value(text)
  end

  def full_array
    [locale.to_s] + key.key.split('.') + [parsed_text]
  end

  def to_h
    { [locale, key.key].join('.') => parsed_text }
  end

  def to_hierarchical_h
    hierarchical_hash_from_array(full_array)
  end

  def hierarchical_hash_from_array(array_hierarchy, hash_hierarchy = {})
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
