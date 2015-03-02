class Image < ActiveRecord::Base
  include ActionView::Helpers::TagHelper
  belongs_to :location
  belongs_to :key

  def metadata
    {
      x:      x,
      y:      y,
      width:  width,
      height: height
    }
  end

  def image_tag
    tag 'img', src: image#, data: metadata
  end
end
