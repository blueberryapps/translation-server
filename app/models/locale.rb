class Locale < ActiveRecord::Base
  has_many :translations

  validates :code, uniqueness: true, length: { minimum: 1 }

  scope :alphabetical, -> { order :code }

  def to_s
    code
  end
end
