class PaginationSerializer

  def self.meta(object)
    { pagination: meta_pagination(object) }
  end

  def self.meta_pagination(object)
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
