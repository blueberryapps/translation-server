class TranslationSerializer < ActiveModel::Serializer
  attributes :id, :text, :original_text, :edited, :locale_id, :key_id
end
