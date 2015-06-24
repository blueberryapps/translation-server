class Location < ActiveRecord::Base
  include Resolvable

  has_many :images
  has_many :highlights

  validates :path, uniqueness: true, presence: true

  scope :alphabetical,  -> { order :path }

  def to_s
    path
  end
end
