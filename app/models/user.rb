require 'digest'

class User < ActiveRecord::Base
  ROLES = %w(admin user)
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable,
         :trackable, :validatable

  validates :role, inclusion: ROLES

  scope :alphabetical,  -> { order :email }

  before_create :ensure_api_key

  def photo_url(size = 50)
    link = 'https://www.gravatar.com/avatar/%s?s=%s&d=wavatar'
    link % [Digest::MD5.hexdigest(email.downcase), size]
  end

  def username
    email.split('@').first
  end

  def admin?
    role == 'admin'
  end

  def can_manage_locale?(locale)
    admin? || available_locales.include?(locale.code)
  end

  private

  def ensure_api_key
    self.api_key ||= generate_api_key
  end

  def generate_api_key
    loop do
      token = SecureRandom.hex(16)
      break token unless User.exists?(api_key: token)
    end
  end
end
