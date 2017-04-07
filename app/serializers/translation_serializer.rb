class TranslationSerializer < ActiveModel::Serializer
  attributes :id, :text, :edited, :locale_id, :key_id
end
