class Locale < ActiveRecord::Base
  has_many :translations

  scope :alphabetical,  -> { order :code }

  validates :code, uniqueness: true, length: { minimum: 1 }

  scope :alphabetical, -> { order :code }

  def to_s
    code
  end
end
