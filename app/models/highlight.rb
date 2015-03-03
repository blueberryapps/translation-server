class Highlight < ActiveRecord::Base
  belongs_to :image
  belongs_to :key

  def metadata
    {
      x:         x - 7,
      y:         y - 7,
      width:     width + 14,
      height:    height + 14,
      highlight: true
    }
  end

  def image_tag
    image.image_tag(metadata) if image.image && x && y && width && height
  end
end
