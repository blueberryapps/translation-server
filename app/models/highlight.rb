class Highlight < ActiveRecord::Base
  include Resolvable

  belongs_to :image
  belongs_to :key
  belongs_to :locale
  belongs_to :location

  validates :key, :image, presence: true

  def desktop?
    image.variant == 'desktop'
  end

  def identifier
    "highlight_identifier_#{key.id}_#{id}"
  end

  def image_tag
    image.image_tag(metadata) if image.image && x && y && width && height
  end

  def full_image_tag
    if image.image && x && y && width && height
      image.image_tag(metadata.merge(full: true))
    end
  end

  def metadata
    {
      x:         x - 7,
      y:         y - 7,
      width:     width + 14,
      height:    height + 14,
      highlight: true
    }
  end

  def mobile?
    image.variant == 'mobile'
  end
end
