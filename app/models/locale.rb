class Locale < ActiveRecord::Base
  include Resolvable

  default_scope { order(:code) }

  has_many :translations
  has_many :releases
  has_many :highlights

  scope :alphabetical,  -> { order :code }

  validates :code, uniqueness: true, length: { minimum: 1 }

  scope :alphabetical, -> { order :code }

  def self.default
    @default ||= resolve code: 'default'
  end

  def to_s
    code
  end
end
