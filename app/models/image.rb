require 'base64'

class Image < ActiveRecord::Base
  include ActionView::Helpers::TagHelper
  belongs_to :location
  belongs_to :key

  validates :location, :key, :image, presence: true

  before_validation :set_image_from_file

  attr_accessor :image_file

  def metadata
    {
      x:         x,
      y:         y,
      width:     width,
      height:    height,
      highlight: highlight
    }
  end

  def image_tag
    tag 'img', src: image, data: metadata, class: 'screenshot'
  end

  private

  def set_image_from_file
    if image_file.present?
      content_type = case image_file.headers
                     when %r{image/png} then 'image/png'
                     when %r{image/(jpg|jpeg)} then 'image/jpg'
                     end
      self.image = "data:#{content_type};base64,"
      self.image += Base64.encode64(image_file.read)
    end
  end
end
