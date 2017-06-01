class TranslationSerializer < ActiveModel::Serializer
  attributes :id, :text, :original_text, :edited, :locale_id, :key_id, :key

  def key
    object.key.key
  end
end
