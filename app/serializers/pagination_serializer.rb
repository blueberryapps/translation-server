class PaginationSerializer < ActiveModel::Serializer::CollectionSerializer

  def initialize(object, options = {})
    meta_key = options[:meta_key] || :meta
    options[meta_key] ||= {}

    options[meta_key][:pagination] = meta_pagination(object)

    pp object

    super
  end

  private

  def meta_pagination(object)
    if object.limit_value.present?
      {
        current_page: object.current_page,
        next_page:    object.next_page,
        prev_page:    object.prev_page,
        total_pages:  object.total_pages,
        total_count:  object.total_count
      }
    else
      { total_count:  object.total_count }
    end
  end
end
