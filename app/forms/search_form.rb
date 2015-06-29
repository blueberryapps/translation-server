class SearchForm
  include Virtus.value_object
  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attribute :scope
  attribute :query,         String
  attribute :location,      String
  attribute :edited_filter, String, default: 'all'

  def resolve
    query_edited query_location(query_scope(scope))
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

  def query_edited(scope)
    case edited_filter
    when 'new' then scope.with_edited_filter(false)
    when 'edited' then scope.with_edited_filter(true)
    else scope
    end
  end

  def persisted?
    false
  end
end
