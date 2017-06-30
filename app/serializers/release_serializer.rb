class ReleaseSerializer < ActiveModel::Serializer
  attributes :id, :locale, :version, :created_at

  def locale
    object.locale.code
  end
end
