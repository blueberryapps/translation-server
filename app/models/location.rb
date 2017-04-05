class Location < ActiveRecord::Base
  include Resolvable

  has_many :images, dependent: :destroy
  has_many :highlights, dependent: :destroy
  belongs_to :project

  validates :path, uniqueness: { scope: :project_id }, presence: true

  scope :alphabetical,  -> { order :path }

  def to_s
    path
  end
end
