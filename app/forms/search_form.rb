class SearchForm
  include Virtus.value_object
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attribute :scope
  attribute :query
  attribute :location

  def resolve
    query_location query_scope(scope)
  end

  def query_location(scope)
    if location.present?
      scope.with_location(location)
    else
      scope
    end
  end

  def query_scope(scope)
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
