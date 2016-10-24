class RestrictedIp < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :ip

  scope :containing, -> (ip) { where('? <<= ip', ip) }

  def cidr_prefix
    # ruby IPAddr library doesn't provide any method to get prefix/subnet
    # so this rather crude workaround has to be used
    ip.instance_variable_get(:@mask_addr).to_s(2).count('1')
  end

  def cidr_ip
    cidr_prefix == 32 ? ip.to_s : "#{ip.to_s}/#{cidr_prefix}"
  end

  def self.contains?(ip)
    return true unless containing(ip).empty?
    false
  end
end
