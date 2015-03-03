require 'base64'

class Image < ActiveRecord::Base
  include ActionView::Helpers::TagHelper
  include Rails.application.routes.url_helpers

  belongs_to :location
  belongs_to :key

  scope :alphabetical,  -> { order :id }

  validates :location, :key, presence: true

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
    return '' if image.blank?
    tag 'img', src: display_image_path(id), data: metadata, class: 'screenshot'
  end

  def binary
    Base64.decode64(image_parts.last)
  end

  def content_type
    image_parts.first.gsub('data:', '')
  end

  def image_parts
    @parts ||= image.split(';base64,', 2)
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
