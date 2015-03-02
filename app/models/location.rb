class Location < ActiveRecord::Base
  def to_s
    path
  end
end
