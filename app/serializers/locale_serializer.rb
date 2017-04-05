class LocaleSerializer < ActiveModel::Serializer
  attributes :id, :code, :translation_count, :translated_count
end
