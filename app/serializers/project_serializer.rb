class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :default_locale_id, :api_token, :screenshots, :errors
  has_many :locales
end
