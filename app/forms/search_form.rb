class SearchForm
  include Virtus.value_object
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attribute :scope
  attribute :query

  def resolve
    if query.present?
      scope.with_query(query)
    else
      scope
    end
  end

  def persisted?
    false
  end
end
