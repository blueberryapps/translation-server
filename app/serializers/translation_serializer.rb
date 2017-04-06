class TranslationSerializer < ActiveModel::Serializer
  attributes :id, :text, :edited, :locale_id
end
