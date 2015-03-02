class Key < ActiveRecord::Base

  has_many :images
  has_many :translations
  has_many :locales,   through: :translations
  has_many :locations, through: :images

  def normalized_key
    I18n.normalize_keys(nil, key, nil, '.')
  end

  def to_s
    key
  end
end
