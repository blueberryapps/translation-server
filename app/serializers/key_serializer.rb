class KeySerializer < ActiveModel::Serializer
  attributes :id, :key, :note, :data_type
  has_many :translations

  def data_type
    object.html? ? 'html' : object.data_type
  end
end
