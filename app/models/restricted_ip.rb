class RestrictedIp < ActiveRecord::Base
  belongs_to :user

  scope :containing, -> (ip) { where('? <<= ip', ip) }

  def self.contains?(ip)
    return true unless containing(ip).empty?
    false
  end
end
