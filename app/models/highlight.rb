class Highlight < ActiveRecord::Base
  belongs_to :image
  belongs_to :key

  def metadata
    {
      x:         x-5,
      y:         y-5,
      width:     width+10,
      height:    height+10,
      highlight: true
    }
  end

  def image_tag
    image.image_tag(metadata)
  end
end
