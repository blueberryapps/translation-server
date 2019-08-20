class Locale < ApplicationRecord
  include Resolvable

  default_scope { order(:code) }

  belongs_to :project

  has_many :translations, dependent: :destroy
  has_many :releases, dependent: :destroy
  has_many :highlights, dependent: :destroy

  scope :alphabetical,  -> { order :code }

  validates :code, uniqueness: { scope: :project_id },
                   length: { minimum: 1 },
                   format: { with: /\A[a-zA-Z0-9_-]+\z/ }

  scope :alphabetical, -> { order :code }

  def to_s
    code
  end

  def translation_count
    translations.count
  end

  def translated_count
    translations.already_edited.count
  end
end
