class KeySerializer < ActiveModel::Serializer
  attributes :id, :key, :note, :data_type
end
