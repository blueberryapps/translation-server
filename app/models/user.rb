require 'digest'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable,
         :trackable, :validatable

  def photo_url(size = 50)
    link = 'https://www.gravatar.com/avatar/%s?s=%s&d=wavatar'
    link % [Digest::MD5.hexdigest(email.downcase), size]
  end

  def username
    email.split('@').first
  end
end
