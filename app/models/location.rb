class Location < ActiveRecord::Base
  include Resolvable

  has_many :images
  has_many :highlights
  belongs_to :project

  validates :path, uniqueness: { scope: :project_id }, presence: true

  scope :alphabetical,  -> { order :path }

  def to_s
    path
  end
end
