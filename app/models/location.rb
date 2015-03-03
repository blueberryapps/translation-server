class Location < ActiveRecord::Base
  has_many :images
  validates :path, uniqueness: true

  scope :alphabetical,  -> { order :path }

  def to_s
    path
  end
end
