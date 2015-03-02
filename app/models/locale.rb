class Locale < ActiveRecord::Base
  has_many :translations

  def to_s
    code
  end
end
