class Location < ActiveRecord::Base
  has_many :images
  validates :path, uniqueness: true, presence: true

  def to_s
    path
  end
end